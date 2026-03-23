import { useAppSelector } from '@/store/hook'
import React from 'react'
import HarvardHeader from './HarvardHeader'
import TechHeader from './TechHeader'

const DefaultHeader = () => {
   const {
      template: { isHarvard },
   } = useAppSelector((state) => state.builderReducer)

   if (isHarvard) {
      return <HarvardHeader />
   } else {
      return <TechHeader />
   }
}

export default DefaultHeader
