'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import RowBadge from '@/components/RowBadge'
import Button from '@/components/Button'
import { useAppDispatch } from '@/store/hook'
import { useEffect } from 'react'
import { resetBuilder } from '@/store/reducers/builder/builder.slice'

export default function Home() {
   const dispatch = useAppDispatch()
   const router = useRouter()

   useEffect(() => {
      dispatch(resetBuilder({}))
   }, [])

   return (
      <div className="home-main h-auto md:h-[calc(100%-77px-65px)]">
         <div className="first py-12 px-6 md:py-8 md:px-16 bg-sky-50/50 flex flex-col md:flex-row items-center justify-between h-full gap-8">
            <div className="text-center md:text-left">
               <h1 className="text-2xl md:text-3xl leading-tight md:leading-10 font-bold mb-4">
                  Open Source <br className="hidden md:block" />{' '}
                  <span className="text-sky-700">AI Resume Builder & Analyzer</span> <br className="hidden md:block" /> that land
                  you tech <br className="hidden md:block" /> jobs
               </h1>
               <p className="text-sm text-gray-600">
                  Create ATS-optimized tech resumes in under <br className="hidden md:block" /> 10 minutes. 3x your interview
                  chances with <br className="hidden md:block" /> AI-powered resume tailoring.
               </p>
               <div className="mt-8 mx-auto md:mx-0 w-full max-w-[200px]">
                  <Button label="Try For Free" className="w-full" onClick={() => router.push('/builder')} />
               </div>
               <div className="mt-8 flex flex-wrap justify-center md:justify-start items-center gap-2">
                  <RowBadge label="AI-Powered" />
                  <RowBadge label="ATS Optimized" type="green" />
                  <RowBadge label="100% Free" type="yellow" />
                  <RowBadge label="Privacy First" type="purple" />
               </div>
            </div>
            <div className="hidden md:block">
               <Image src="/images/background.svg" alt="Background illustration" width={464} height={659} />
            </div>
         </div>
      </div>
   )
}
