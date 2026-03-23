'use client'
import React, { ReactNode } from 'react'
import { PrimeReactProvider, PrimeReactPTOptions } from 'primereact/api'
// import { twMerge } from 'tailwind-merge'
import { Provider } from 'react-redux'
import { store } from '@/store'

// import Tailwind from 'primereact/passthrough/tailwind'
// import { cn } from '@/lib/utils'
// import { InputTextPassThroughMethodOptions } from 'primereact/inputtext'

const PrimeReactContainer = ({ children }: { children: ReactNode }) => {
   // const MyDesignSystem: PrimeReactPTOptions = {
   //    inputtext: {
   //       root: ({ props, context }: InputTextPassThroughMethodOptions) => ({
   //          className: cn('text-xs p-4 border border-gray-300 text-gray-700 font-normal'),
   //       }),
   //    },
   // }
   return (
      <PrimeReactProvider
         value={
            {
               // unstyled: true,
               // pt: MyDesignSystem,
               // ptOptions: { mergeSections: true, mergeProps: true, classNameMergeFunction: twMerge },
            }
         }
      >
         <Provider store={store}>{children}</Provider>
      </PrimeReactProvider>
   )
}

export default PrimeReactContainer
