'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface IProps {
   url: string
   label: string
}

const NavLink = (props: IProps) => {
   const pathname = usePathname()
   return (
      <Link
         href={props.url}
         className={cn(
            'py-2 px-4 rounded-md font-medium text-gray-600',
            'hover:bg-sky-500/10 hover:text-sky-700!',
            pathname === props.url && 'bg-sky-500/10 text-sky-700!'
         )}
      >
         {props.label}
      </Link>
   )
}

export default NavLink
