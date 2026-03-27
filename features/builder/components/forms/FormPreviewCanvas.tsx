import { useAppDispatch, useAppSelector } from '@/store/hook'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DEFAULT_TYPOGRAPHY, GLOBAL_FONT_SCALES, options, PAGE_SIZES, TYPOGRAPHY_PX } from '../../config/constant'
import { setGlobalFontSize, setTemplate } from '@/store/reducers/builder/builder.slice'
import { cn } from '@/lib/utils'
import { Eye, ZoomOut, ZoomIn, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '@/components/Button'
import DefaultLayout from '../features/layout/DefaultLayout'
import { useReactToPrint } from 'react-to-print'
import { downloadPDF, exportToPDF } from '../features/ResumePDF'
import { downloadJSON, transformToJSONResume } from '@/lib/export-utils'

const FormPreviewCanvas = () => {
   const dispatch = useAppDispatch()
   const { theme, personalInfo, sections } = useAppSelector((state) => state.builderReducer)

   const pageSize = PAGE_SIZES[theme.pageSize]
   const aspectRatio = pageSize.width / pageSize.height
   const typography = theme.typography || DEFAULT_TYPOGRAPHY

   const contentRef = useRef<HTMLDivElement>(null)
   const componentRef = useRef<HTMLDivElement>(null)
   const containerRef = useRef<HTMLDivElement>(null)
   const [currentPage, setCurrentPage] = useState(0)
   const [pageCount, setPageCount] = useState(1)
   const [pageHeight, setPageHeight] = useState(0)
   const [pan, setPan] = useState({ x: 0, y: 0 })
   const [isPanning, setIsPanning] = useState(false)
   const [startPan, setStartPan] = useState({ x: 0, y: 0 })
   const [zoom, setZoom] = useState(1)

   const [isExporting, setIsExporting] = useState(false)

   const scale = GLOBAL_FONT_SCALES[theme.fontSize]

   /* TEMPLATE */
   const isHarvard = theme.template === 'harvard'
   const isTech = theme.template === 'tech'
   const isMinimal = theme.template === 'minimal'

   const fontSize = useMemo(
      () => ({
         name: Math.round(24 * scale),
         tagline: Math.round(14 * scale),
         summary: Math.round(11 * scale),
         sectionHeading: Math.round(14 * scale),
         itemTitle: Math.round(12 * scale),
         itemSubtitle: Math.round(11 * scale),
         itemBody: Math.round(10 * scale),
         itemDate: Math.round(9 * scale),
      }),
      [typography, scale]
   )

   // Calculate page breaks
   useEffect(() => {
      const calculatePages = () => {
         if (contentRef.current && componentRef.current?.parentElement) {
            const contentHeight = contentRef.current.scrollHeight
            const containerHeight = componentRef.current.parentElement.offsetHeight

            if (containerHeight > 0) {
               setPageHeight(containerHeight)
               // Add a tiny bit of tolerance (2px) for sub-pixel rendering
               const pages = Math.max(1, Math.ceil((contentHeight - 2) / containerHeight))
               setPageCount(pages)

               if (currentPage >= pages) {
                  setCurrentPage(Math.max(0, pages - 1))
               }
            }
         }
      }

      // Initial calculation
      calculatePages()

      // Re-calculate after a small delay to ensure rendering is complete
      const timer = setTimeout(calculatePages, 100)

      // Also observe size changes for more immediate updates
      const resizeObserver = new ResizeObserver(calculatePages)
      if (contentRef.current) resizeObserver.observe(contentRef.current)
      if (componentRef.current) resizeObserver.observe(componentRef.current)

      return () => {
         clearTimeout(timer)
         resizeObserver.disconnect()
      }
   }, [sections, personalInfo, theme, currentPage, zoom])

   // Zoom controls
   const handleZoomIn = () => setZoom(Math.min(zoom + 0.25, 3))
   const handleZoomOut = () => setZoom(Math.max(zoom - 0.25, 0.5))
   const handleReset = () => {
      setZoom(1)
      setPan({ x: 0, y: 0 })
   }

   // Panning logic (shared between Mouse and Touch)
   const startDragging = (clientX: number, clientY: number) => {
      setIsPanning(true)
      setStartPan({ x: clientX - pan.x, y: clientY - pan.y })
   }

   const handleDrag = (clientX: number, clientY: number) => {
      if (isPanning) {
         setPan({ x: clientX - startPan.x, y: clientY - startPan.y })
      }
   }

   const stopDragging = () => setIsPanning(false)

   // Mouse events
   const handleMouseDown = (e: React.MouseEvent) => {
      if (e.button === 0 && !e.defaultPrevented) {
         startDragging(e.clientX, e.clientY)
      }
   }

   const handleMouseMove = (e: React.MouseEvent) => handleDrag(e.clientX, e.clientY)
   const handleMouseUp = () => stopDragging()

   // Touch events
   const handleTouchStart = (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
         startDragging(e.touches[0].clientX, e.touches[0].clientY)
      }
   }

   const handleTouchMove = (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
         handleDrag(e.touches[0].clientX, e.touches[0].clientY)
      }
   }

   const handleTouchEnd = () => stopDragging()

   // Wheel zoom
   const handleWheel = (e: React.WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
         e.preventDefault()
         const delta = e.deltaY > 0 ? -0.1 : 0.1
         setZoom(Math.min(Math.max(zoom + delta, 0.5), 3))
      }
   }

   const handleNextPage = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (currentPage < pageCount - 1) {
         setCurrentPage(currentPage + 1)
      }
   }

   const handlePrevPage = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (currentPage > 0) {
         setCurrentPage(currentPage - 1)
      }
   }

   const renderLayout = () => {
      return <DefaultLayout ref={contentRef} />
   }

   const handleExport = useCallback(async () => {
      setIsExporting(true)
      try {
         const blob = await exportToPDF({ personalInfo, theme, sections })
         const filename = personalInfo.fullName ? personalInfo.fullName.replaceAll(/\s+/g, '_') + '_Resume.pdf' : 'Resume.pdf'
         downloadPDF(blob, filename)
      } catch (error) {
         console.error('Export failed:', error)
      } finally {
         setIsExporting(false)
      }
   }, [sections, personalInfo, theme])

   useEffect(() => {
      dispatch(
         setTemplate({
            isHarvard,
            isTech,
            isMinimal,
         })
      )
   }, [theme.template])

   const handleExportJSON = useCallback(() => {
      const jsonResume = transformToJSONResume(personalInfo, sections)
      const filename = personalInfo.fullName ? personalInfo.fullName.replaceAll(/\s+/g, '_') + '_Resume.json' : 'Resume.json'
      downloadJSON(jsonResume, filename)
   }, [personalInfo, sections])

   useEffect(() => {
      if (fontSize) {
         dispatch(setGlobalFontSize(fontSize))
      }
   }, [fontSize])

   return (
      <div className="c-canvas-preview bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/40 sticky top-4 overflow-hidden h-[calc(100vh-9rem)] flex flex-col transition-all duration-300">
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-gray-200 gap-4">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 flex items-center justify-center bg-sky-100 rounded-xl">
                  <Eye size={20} className="text-sky-700" />
               </div>
               <div>
                  <h5 className="font-bold text-gray-800">Live Preview</h5>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                     {options.pageFormat.find((item) => item?.value === theme.pageSize)?.label}
                  </p>
               </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
               <Button
                  label="JSON"
                  size="sm"
                  icon={'pi-code'}
                  iconType="prime"
                  variant="stroke"
                  onClick={handleExportJSON}
                  theme="normal"
                  className="flex-1 sm:flex-none h-9 px-3 text-xs"
               />
               <Button
                  label="Export PDF"
                  size="sm"
                  icon={'pi-download'}
                  iconType="prime"
                  variant="solid"
                  onClick={handleExport}
                  isLoading={isExporting}
                  theme="primary"
                  className="flex-1 sm:flex-none h-9 px-3 text-xs"
               />
            </div>
         </div>
         <div className="flex items-center justify-between px-4 py-2 border border-b-gray-200 bg-white z-10">
            <div className="flex items-center gap-1">
               <button onClick={handleZoomOut} className="p-1.5 hover:bg-muted rounded-md transition-colors" title="Zoom Out">
                  <ZoomOut className="w-4 h-4 text-muted-foreground" />
               </button>
               <span className="text-xs font-medium text-muted-foreground w-12 text-center">{Math.round(zoom * 100)}%</span>
               <button onClick={handleZoomIn} className="p-1.5 hover:bg-muted rounded-md transition-colors" title="Zoom In">
                  <ZoomIn className="w-4 h-4 text-muted-foreground" />
               </button>
               <button
                  onClick={handleReset}
                  className="p-1.5 hover:bg-muted rounded-md transition-colors ml-1"
                  title="Reset View"
               >
                  <RotateCcw className="w-4 h-4 text-muted-foreground" />
               </button>
            </div>

            <div className="flex items-center gap-2">
               <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0 || pageCount <= 1}
                  className="p-1 hover:bg-muted disabled:opacity-30 rounded-md transition-colors"
                  title="Previous Page"
               >
                  <ChevronLeft className="w-4 h-4 text-muted-foreground" />
               </button>
               <span className="text-xs font-medium text-muted-foreground min-w-20 text-center">
                  Page {currentPage + 1} of {pageCount}
               </span>
               <button
                  onClick={handleNextPage}
                  disabled={currentPage === pageCount - 1 || pageCount <= 1}
                  className="p-1 hover:bg-muted disabled:opacity-30 rounded-md transition-colors"
                  title="Next Page"
               >
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
               </button>
            </div>
         </div>

         <div
            ref={containerRef}
            className={cn(
               'flex-1 overflow-auto p-4 cursor-grab select-none bg-gray-50 touch-none',
               isPanning && 'cursor-grabbing'
            )}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
         >
            <div
               className={cn(
                  'mx-auto border border-border shadow-sm overflow-hidden transition-all',
                  !isPanning && 'duration-300'
               )}
               style={{
                  width: '100%',
                  maxWidth: '595px',
                  aspectRatio: aspectRatio,
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  backgroundColor: '#ffffff',
                  transformOrigin: 'top center',
               }}
            >
               <div
                  ref={componentRef}
                  id="print-content"
                  className="w-full min-h-full transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateY(-${currentPage * pageHeight}px)` }}
               >
                  {renderLayout()}
               </div>
            </div>
         </div>
      </div>
   )
}

export default FormPreviewCanvas
