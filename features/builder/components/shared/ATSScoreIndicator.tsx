'use client'

import React, { useMemo } from 'react'
import { useAppSelector } from '@/store/hook'
import { calculateATSScore } from '@/lib/ats'
import { ProgressBar } from 'primereact/progressbar'
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const ATSScoreIndicator = () => {
   const { personalInfo, sections } = useAppSelector((state) => state.builderReducer)

   const { score, details } = useMemo(() => calculateATSScore(personalInfo, sections), [personalInfo, sections])

   const getScoreColor = (s: number) => {
      if (s >= 80) return 'text-green-600'
      if (s >= 50) return 'text-amber-500'
      return 'text-red-500'
   }

   const getProgressBarColor = (s: number) => {
      if (s >= 80) return '#10b981'
      if (s >= 50) return '#f59e0b'
      return '#ef4444'
   }

   return (
      <div className="p-4 bg-sky-50/50 rounded-xl border border-sky-100 shadow-sm transition-all hover:shadow-md">
         <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">ATS Optimization Score</span>
            <span className={cn('text-lg font-bold', getScoreColor(score))}>{score}%</span>
         </div>

         <ProgressBar
            value={score}
            showValue={false}
            style={{ height: '8px', borderRadius: '4px' }}
            color={getProgressBarColor(score)}
         />

         <div className="mt-4 space-y-2">
            {details.map((detail) => (
               <div key={detail.label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-gray-600">
                     {detail.status === 'success' && <CheckCircle size={14} className="text-green-500" />}
                     {detail.status === 'warning' && <AlertCircle size={14} className="text-amber-500" />}
                     {detail.status === 'error' && <XCircle size={14} className="text-red-400" />}
                     <span>{detail.label}</span>
                  </div>
                  <span
                     className={cn(
                        'font-medium',
                        detail.status === 'success'
                           ? 'text-green-600'
                           : detail.status === 'warning'
                             ? 'text-amber-600'
                             : 'text-rose-600'
                     )}
                  >
                     {detail.status === 'success' && 'Good'}
                     {detail.status === 'warning' && 'Partial'}
                     {detail.status === 'error' && 'Missing'}
                  </span>
               </div>
            ))}
         </div>

         <p className="mt-4 text-[10px] text-gray-400 italic leading-tight">
            Tip: Complete all sections and use professional links to improve your score.
         </p>
      </div>
   )
}

export default ATSScoreIndicator
