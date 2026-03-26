import React from 'react'
import NavLink from '../NavLink'

const Topbar = ({ menu }: { menu: any[] }) => {
   return (
      <nav className="home-navbar flex items-center justify-between py-4 px-6 md:px-16 border-b border-b-gray-200 sticky top-0 z-50 bg-white">
         <div className="nav-icon flex items-center gap-2">
            <div className="bg-sky-500 p-2 rounded-md text-md text-white font-bold">RAR</div>
            <div>
               <div className="font-bold mb-1">Resume Builder</div>
               <div className="text-xs text-gray-600">Clean. Simple. Professional.</div>
            </div>
         </div>
         <div className="flex items-center gap-4">
            {menu.map((item, idx) => (
               <React.Fragment key={idx}>
                  <NavLink url={item.url} label={item.label} />
               </React.Fragment>
            ))}
         </div>
      </nav>
   )
}

export default Topbar
