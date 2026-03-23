import { useAppDispatch, useAppSelector } from '@/store/hook'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DEFAULT_TYPOGRAPHY, GLOBAL_FONT_SCALES, options, PAGE_SIZES, TYPOGRAPHY_PX } from '../../config/constant'
import { setGlobalFontSize, setTemplate } from '@/store/reducers/builder/builder.slice'
import { cn } from '@/lib/utils'
import { Eye, ZoomOut, ZoomIn, RotateCcw } from 'lucide-react'
import Button from '@/components/Button'
import DefaultLayout from '../features/layout/DefaultLayout'
import { useReactToPrint } from 'react-to-print'
import { downloadPDF, exportToPDF } from '../features/ResumePDF'

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
   //    const fontSize = useMemo(
   //       () => ({
   //          name: Math.round(TYPOGRAPHY_PX[typography.name].name * scale),
   //          summary: Math.round(TYPOGRAPHY_PX[typography.headers].headers * scale),
   //          contact: Math.round(TYPOGRAPHY_PX[typography.body].body * scale),
   //          sectionHeading: Math.round(14 * scale),
   //          itemTitle: Math.round(13 * scale),
   //          itemSubtitle: Math.round(11 * scale),
   //          itemBody: Math.round(10 * scale),
   //          itemDate: Math.round(9 * scale),
   //       }),
   //       [typography, scale]
   //    )

   const pageHeightPx = 842

   // Calculate page breaks
   //    useEffect(() => {
   //       if (contentRef.current) {
   //          const contentHeight = contentRef.current.scrollHeight
   //          const pages = Math.max(1, Math.ceil(contentHeight / pageHeightPx))
   //          setPageCount(pages)
   //          if (currentPage >= pages) {
   //             setCurrentPage(Math.max(0, pages - 1))
   //          }
   //       }
   //    }, [sections, personalInfo, theme, currentPage])

   // Zoom controls
   const handleZoomIn = () => setZoom(Math.min(zoom + 0.25, 3))
   const handleZoomOut = () => setZoom(Math.max(zoom - 0.25, 0.5))
   const handleReset = () => {
      setZoom(1)
      setPan({ x: 0, y: 0 })
   }

   // Pan handlers
   const handleMouseDown = (e: React.MouseEvent) => {
      if (e.button === 0 && !e.defaultPrevented) {
         setIsPanning(true)
         setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y })
      }
   }

   const handleMouseMove = (e: React.MouseEvent) => {
      if (isPanning) {
         setPan({ x: e.clientX - startPan.x, y: e.clientY - startPan.y })
      }
   }

   const handleMouseUp = () => setIsPanning(false)

   // Wheel zoom
   const handleWheel = (e: React.WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
         e.preventDefault()
         const delta = e.deltaY > 0 ? -0.1 : 0.1
         setZoom(Math.min(Math.max(zoom + delta, 0.5), 3))
      }
   }

   const renderLayout = () => {
      //   if (isPortfolio) return renderPortfolioLayout(visibleSections)
      //   if (isCorporate) return renderCorporateLayout(contentRef, visibleSections)
      //   if (isCreative) return renderCreativeLayout(contentRef, visibleSections)
      //   if (isElegant) return renderElegantLayout(contentRef, visibleSections)
      //   if (isModern) return renderModernLayout(contentRef, visibleSections)
      //   return renderStandartLayout(contentRef, visibleSections)
      return <DefaultLayout ref={contentRef} />
   }

   const handleExport = useCallback(async () => {
      setIsExporting(true)
      try {
         const blob = await exportToPDF({ personalInfo, theme, sections })
         const filename = personalInfo.fullName ? personalInfo.fullName.replace(/\s+/g, '_') + '_Resume.pdf' : 'Resume.pdf'
         downloadPDF(blob, filename)
      } catch (error) {
         console.error('Export failed:', error)
      } finally {
         setIsExporting(false)
      }
   }, [sections, personalInfo, theme])

   const handlePrint = useReactToPrint({
      contentRef, // ← still correct

      documentTitle: `${personalInfo?.fullName || 'Resume'}_${new Date().toISOString().slice(0, 10)}`,

      pageStyle: `
      @page {
         size: A4 portrait;
         margin: 0;
      }
      @media print {
         body {
            margin: 0 !important;
            padding: 0 !important;
         }
      }
   `,

      // This replaces onBeforeGetContent in v3.x
      onBeforePrint: () => {
         // Reset zoom & pan so the printed version looks clean (no transform/scale artifacts)
         setZoom(1)
         setPan({ x: 0, y: 0 })

         // Because setZoom/setPan are async (batched), return a Promise to wait for re-render
         return new Promise<void>((resolve) => {
            // Small timeout or use a state flag + useEffect to detect render completion
            setTimeout(() => {
               resolve()
            }, 300) // ← 300–600 ms is usually enough for React to re-render
         })
      },

      // Optional: control iframe lifecycle (recommended)
      preserveAfterPrint: false, // default = false → auto-remove iframe after print dialog closes

      // Helpful for debugging
      onAfterPrint: () => {
         console.log('Print dialog closed')
      },

      onPrintError: (errorLocation, error) => {
         console.error('Print error:', errorLocation, error)
      },
   })

   useEffect(() => {
      dispatch(
         setTemplate({
            isHarvard,
            isTech,
            isMinimal,
         })
      )
   }, [theme.template])

   useEffect(() => {
      if (fontSize) {
         dispatch(setGlobalFontSize(fontSize))
      }
   }, [fontSize])

   return (
      <div className="c-canvas-preview bg-white rounded-md shadow-md borde border-l-none border-t-4 border-t-sky-600 sticky top-4 overflow-hidden h-[calc(100vh-9rem)]">
         <div className="flex items-center justify-between p-4 border border-b-gray-200">
            <div>
               <div className="flex items-center gap-2">
                  <Eye size={20} className="text-sky-700" />
                  <h5 className="font-medium">Live Preview</h5>
               </div>
               <p className="text-sm text-gray-500 mt-2">
                  {options.pageFormat.find((item) => item?.value === theme.pageSize)?.label}
               </p>
            </div>
            <Button
               label="Export PDF"
               size="sm"
               icon={'pi-download'}
               iconType="prime"
               variant="stroke"
               onClick={handleExport}
               //    isLoading={isExporting}
            />
         </div>
         <div className="flex items-center gap-1 justify-center p-2 border border-b-gray-200">
            <button onClick={handleZoomOut} className="p-1.5 hover:bg-muted rounded-none transition-colors" title="Zoom Out">
               <ZoomOut className="w-4 h-4 text-muted-foreground" />
            </button>
            <span className="text-xs font-medium text-muted-foreground w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={handleZoomIn} className="p-1.5 hover:bg-muted rounded-none transition-colors" title="Zoom In">
               <ZoomIn className="w-4 h-4 text-muted-foreground" />
            </button>
            <button onClick={handleReset} className="p-1.5 hover:bg-muted rounded-none transition-colors ml-1" title="Reset View">
               <RotateCcw className="w-4 h-4 text-muted-foreground" />
            </button>
         </div>
         {/* <div className="border border-t-2 border-t-gray-500/10 mb-3"></div> */}
         <div
            ref={containerRef}
            className={cn('flex-1 overflow-hidden p-4 cursor-grab select-none bg-gray-50', isPanning && 'cursor-grabbing')}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
         >
            <div
               className="mx-auto border border-border shadow-sm overflow-hidden origin-center transition-transform duration-75"
               style={{
                  width: '100%',
                  maxWidth: '595px',
                  aspectRatio: aspectRatio,
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  backgroundColor: '#ffffff',
               }}
            >
               <div ref={componentRef} id="print-content" className="w-full h-full">
                  {renderLayout()}
               </div>
            </div>
         </div>
      </div>
   )
}

export default FormPreviewCanvas
