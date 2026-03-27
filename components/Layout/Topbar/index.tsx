'use client'

import React, { useState, useEffect } from 'react'
import NavLink from '../NavLink'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import { Menu, X, Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'

const Topbar = ({ menu }: { menu: any[] }) => {
   const router = useRouter()
   const [isScrolled, setIsScrolled] = useState(false)
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY > 20)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
   }, [])

   return (
      <nav
         className={cn(
            'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-16 py-4 flex items-center justify-between',
            isScrolled 
               ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 py-3' 
               : 'bg-transparent'
         )}
      >
         {/* Logo Section */}
         <Link 
            href="/"
            className="flex items-center gap-3 cursor-pointer group"
         >
            <div className="bg-sky-600 p-2 rounded-xl text-white shadow-lg shadow-sky-200 transition-transform group-hover:scale-105">
               <Rocket size={20} />
            </div>
            <div className="hidden sm:block text-left">
               <div className="font-bold text-gray-900 leading-tight tracking-tight">AI Resume Builder</div>
               <div className="text-[10px] text-sky-600 font-semibold uppercase tracking-widest">Premium Edition</div>
            </div>
         </Link>

         {/* Desktop Menu */}
         <div className="hidden md:flex items-center gap-2 bg-gray-100/50 p-1 rounded-full border border-gray-200/50">
            {menu.map((item) => (
               <NavLink key={item.url} url={item.url} label={item.label} />
            ))}
         </div>

         {/* Actions */}
         <div className="flex items-center gap-3">
            <Button
               label="Get Started"
               size="sm"
               className="hidden sm:flex shadow-md shadow-sky-100"
               onClick={() => router.push('/builder')}
            />
            
            {/* Mobile Toggle */}
            <button 
               className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
         </div>

         {/* Mobile Menu Overlay */}
         <div className={cn(
            'fixed inset-0 top-18 bg-white z-40 md:hidden transition-all duration-300 ease-in-out px-6 py-8',
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
         )}>
            <div className="flex flex-col gap-4">
               {menu.map((item) => (
                  <div key={item.url} onClick={() => setIsMobileMenuOpen(false)}>
                     <NavLink url={item.url} label={item.label} />
                  </div>
               ))}
               <hr className="my-2 border-gray-100" />
               <Button
                  label="Build Your Resume"
                  isBlock
                  onClick={() => {
                     setIsMobileMenuOpen(false)
                     router.push('/builder')
                  }}
               />
            </div>
         </div>
      </nav>
   )
}

export default Topbar
