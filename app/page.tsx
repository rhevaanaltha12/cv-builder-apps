'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAppDispatch } from '@/store/hook'
import { resetBuilder } from '@/store/reducers/builder/builder.slice'
import Button from '@/components/Button'
import { Zap, ShieldCheck, Sparkles, BarChart3, FileJson, Layout, ArrowRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const Home = () => {
   const dispatch = useAppDispatch()
   const router = useRouter()

   useEffect(() => {
      dispatch(resetBuilder({}))
   }, [])

   return (
      <div className="flex flex-col min-h-screen bg-white font-jakarta">
         {/* Hero Section */}
         <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 px-6 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
               <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-100/50 blur-[120px] rounded-full" />
               <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-50/50 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto text-center">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Sparkles size={14} className="animate-pulse" />
                  <span>The Future of Resume Building is Here</span>
               </div>

               <h1 className="text-4xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                  Craft a{' '}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-600 to-blue-500">Perfect Resume</span>{' '}
                  <br className="hidden md:block" />
                  in record time with AI.
               </h1>

               <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                  Join thousands of professionals using our AI-powered, ATS-optimized platform to land their dream jobs. No more
                  formatting headaches, just results.
               </p>

               <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                  <Button
                     label="Start Building Now"
                     className="px-8 py-6 text-lg rounded-2xl shadow-xl shadow-sky-200"
                     onClick={() => router.push('/builder')}
                  />
                  <Button
                     label="View Templates"
                     variant="stroke"
                     theme="normal"
                     className="px-8 py-6 text-lg rounded-2xl"
                     onClick={() => router.push('/builder')}
                  />
               </div>

               <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-400 opacity-60">
                  <div className="flex items-center gap-2">
                     <CheckCircle2 size={18} /> <span className="font-medium">Free Forever</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <CheckCircle2 size={18} /> <span className="font-medium">No Signup Required</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <CheckCircle2 size={18} /> <span className="font-medium">ATS-Friendly</span>
                  </div>
               </div>
            </div>
         </section>

         {/* Stats Section */}
         <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 px-8 bg-sky-50/50 rounded-4xl border border-sky-100">
                  {[
                     { label: 'Resumes Created', value: '10,000+' },
                     { label: 'Success Rate', value: '85%' },
                     { label: 'Time Saved', value: '50h+' },
                     { label: 'ATS Score Avg', value: '92/100' },
                  ].map((stat) => (
                     <div key={stat.label} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Features Section */}
         <section id="features" className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Everything you need to excel</h2>
                  <p className="text-gray-600 max-w-xl mx-auto">
                     Powerful features designed to give you a competitive edge in today's job market.
                  </p>
               </div>

               <div className="grid md:grid-cols-3 gap-8">
                  {[
                     {
                        title: 'AI Smart Suggestions',
                        desc: 'Get real-time content suggestions and optimizations powered by world-class AI models.',
                        icon: Sparkles,
                        color: 'bg-amber-100 text-amber-600',
                     },
                     {
                        title: 'ATS Multi-Check',
                        desc: 'Our engine verifies your resume against industry-standard ATS patterns to ensure you get seen.',
                        icon: ShieldCheck,
                        color: 'bg-green-100 text-green-600',
                     },
                     {
                        title: 'Real-time Preview',
                        desc: 'See exactly what your PDF looks like with every keystroke. Pixel-perfect accuracy guaranteed.',
                        icon: Layout,
                        color: 'bg-blue-100 text-blue-600',
                     },
                     {
                        title: 'Modern Templates',
                        desc: 'Choose from a variety of professionally designed, battle-tested templates.',
                        icon: Zap,
                        color: 'bg-purple-100 text-purple-600',
                     },
                     {
                        title: 'Standard Exports',
                        desc: 'Export to high-quality PDF or industry-standard JSON Resume format for maximum portability.',
                        icon: FileJson,
                        color: 'bg-rose-100 text-rose-600',
                     },
                     {
                        title: 'Data Privacy First',
                        desc: 'Your data stays with you. We prioritize your privacy and never sell your information.',
                        icon: BarChart3,
                        color: 'bg-sky-100 text-sky-600',
                     },
                  ].map((feature) => (
                     <div
                        key={feature.title}
                        className="group p-8 rounded-3xl border border-gray-100 bg-white hover:border-sky-200 hover:shadow-xl hover:shadow-sky-50 transition-all duration-300"
                     >
                        <div
                           className={cn(
                              'w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110',
                              feature.color
                           )}
                        >
                           <feature.icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* How It Works Section */}
         <section className="py-24 px-6 bg-sky-50/30">
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col lg:flex-row items-center gap-16">
                  <div className="lg:w-1/2">
                     <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                        Your dream job is just <br />3 steps away.
                     </h2>
                     <div className="space-y-8">
                        {[
                           {
                              step: '01',
                              title: 'Choose a Template',
                              desc: 'Select from our library of professional, ATS-optimized templates designed for different industries.',
                           },
                           {
                              step: '02',
                              title: 'Fill & AI Optimize',
                              desc: 'Input your details and let our AI assist you in writing impactful summaries and descriptions.',
                           },
                           {
                              step: '03',
                              title: 'Download & Apply',
                              desc: 'Export your resume in high-quality PDF or JSON format and land that interview!',
                           },
                        ].map((item) => (
                           <div key={item.step} className="flex gap-6">
                              <div className="text-4xl font-black text-sky-200/50">{item.step}</div>
                              <div>
                                 <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                                 <p className="text-gray-600">{item.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="mt-12">
                        <Button
                           label="Start Your Journey"
                           icon={<ArrowRight size={18} className="ml-2" />}
                           iconType="lucide"
                           onClick={() => router.push('/builder')}
                        />
                     </div>
                  </div>
                  <div className="lg:w-1/2 relative bg-white p-4 rounded-4xl shadow-2xl border border-gray-100 rotate-2 hover:rotate-0 transition-transform duration-500">
                     <Image src="/images/background.svg" alt="App Screenshot" width={600} height={800} className="rounded-4xl" />
                     <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 animate-bounce duration-3000">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                              <CheckCircle2 size={20} />
                           </div>
                           <div>
                              <div className="text-xs font-bold text-gray-400 uppercase">ATS Score</div>
                              <div className="text-lg font-bold text-gray-900 items-baseline flex gap-1">
                                 98<span className="text-xs text-gray-400">/100</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Final CTA Section */}
         <section className="py-24 px-6 overflow-hidden">
            <div className="max-w-5xl mx-auto bg-sky-600 rounded-[3rem] p-12 md:p-20 text-center relative shadow-2xl shadow-sky-200">
               {/* Decorative dots/shapes */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
               <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

               <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Ready to take the next step <br className="hidden md:block" /> in your career?
               </h2>
               <p className="text-sky-100 text-lg mb-12 max-w-xl mx-auto">
                  Create a professional resume that gets results. No credit card required. No signup barriers.
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                     label="Build My Resume Now"
                     className="bg-white text-sky-700 hover:bg-sky-50 shadow-lg px-10 py-6 text-lg rounded-2xl"
                     onClick={() => router.push('/builder')}
                  />
                  <span className="text-sky-200 font-medium">Takes less than 10 minutes</span>
               </div>
            </div>
         </section>
      </div>
   )
}

export default Home
