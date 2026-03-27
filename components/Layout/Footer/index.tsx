'use client'

import React from 'react'
import Link from 'next/link'
import { Rocket, Github, X, Linkedin, Heart } from 'lucide-react'

const Footer = () => {
   const currentYear = new Date().getFullYear()

   return (
      <footer className="bg-gray-50 border-t border-gray-100 px-6 md:px-16 pt-20 pb-10">
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
               {/* Brand Column */}
               <div className="col-span-1 md:col-span-1">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="bg-sky-600 p-2 rounded-xl text-white shadow-md">
                        <Rocket size={18} />
                     </div>
                     <span className="font-bold text-gray-900 tracking-tight">AI Resume Builder</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                     The ultimate tool for crafting professional, ATS-optimized resumes in minutes. Powered by state-of-the-art
                     AI.
                  </p>
                  <div className="flex items-center gap-4">
                     <Link href="#" className="text-gray-400 hover:text-sky-600 transition-colors" aria-label="Twitter">
                        <X size={20} />
                     </Link>
                     <Link href="#" className="text-gray-400 hover:text-sky-600 transition-colors" aria-label="Github">
                        <Github size={20} />
                     </Link>
                     <Link href="#" className="text-gray-400 hover:text-sky-600 transition-colors" aria-label="Linkedin">
                        <Linkedin size={20} />
                     </Link>
                  </div>
               </div>

               {/* Links Columns */}
               <div>
                  <h4 className="font-bold text-gray-900 mb-6">Product</h4>
                  <ul className="space-y-4 text-sm text-gray-500">
                     <li>
                        <Link href="/builder" className="hover:text-sky-600 transition-colors">
                           Resume Builder
                        </Link>
                     </li>
                     <li>
                        <Link href="#" className="hover:text-sky-600 transition-colors">
                           Templates
                        </Link>
                     </li>
                     <li>
                        <Link href="#" className="hover:text-sky-600 transition-colors">
                           AI Optimization
                        </Link>
                     </li>
                     <li>
                        <Link href="#" className="hover:text-sky-600 transition-colors">
                           ATS Checker
                        </Link>
                     </li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-bold text-gray-900 mb-6">Resources</h4>
                  <ul className="space-y-4 text-sm text-gray-500">
                     <li>
                        <Link href="#" className="hover:text-sky-600 transition-colors">
                           Career Advice
                        </Link>
                     </li>
                     <li>
                        <Link href="#" className="hover:text-sky-600 transition-colors">
                           Resume Examples
                        </Link>
                     </li>
                     <li>
                        <Link href="#" className="hover:text-sky-600 transition-colors">
                           Help Center
                        </Link>
                     </li>
                     <li>
                        <Link href="#" className="hover:text-sky-600 transition-colors">
                           Privacy Policy
                        </Link>
                     </li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-bold text-gray-900 mb-6">Support</h4>
                  <ul className="space-y-4 text-sm text-gray-500">
                     <li>
                        <Link href="#" className="hover:text-sky-600 transition-colors">
                           Contact Us
                        </Link>
                     </li>
                     <li>
                        <Link href="#" className="hover:text-sky-600 transition-colors">
                           FAQ
                        </Link>
                     </li>
                     <li>
                        <Link href="#" className="hover:text-sky-600 transition-colors">
                           Feedback
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>

            <div className="pt-10 border-t border-gray-200/50 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-400">
               <div className="text-center">© {currentYear} Rheva Analtha | AI Resume Builder. All rights reserved.</div>
               <div className="flex items-center gap-1 leading-none">
                  Made with <Heart size={14} className="text-rose-500 fill-rose-500 mx-0.5" /> for the community.
               </div>
            </div>
         </div>
      </footer>
   )
}

export default Footer
