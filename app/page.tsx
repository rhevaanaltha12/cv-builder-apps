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
      <div className="home-main h-[calc(100%-77px-65px)]">
         <div className="first py-8 px-16 bg-sky-50/50 flex items-center justify-between h-full">
            <div className="">
               <h1 className="text-3xl leading-10 font-bold mb-4">
                  Open Source <br /> <span className="text-sky-700">AI Resume Builder & Analyzer</span> <br /> that land you tech{' '}
                  <br /> jobs
               </h1>
               <p className="text-sm text-gray-600">
                  Create ATS-optimized tech resumes in under <br /> 10 minutes. 3x your interview chances with <br /> AI-powered
                  resume tailoring.
               </p>
               <div className="mt-8 w-50">
                  <Button label="Try For Free" className="w-full" onClick={() => router.push('/builder')} />
               </div>
               <div className="mt-8 flex items-center gap-2">
                  <RowBadge label="AI-Powered" />
                  <RowBadge label="ATS Optimized" type="green" />
                  <RowBadge label="100% Free" type="yellow" />
                  <RowBadge label="Privacy First" type="purple" />
               </div>
            </div>
            <Image src="/images/background.svg" alt="Vercel logomark" width={464} height={659} />
         </div>
      </div>
   )
}
