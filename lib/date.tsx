import { DateTime, Interval } from 'luxon'
import { DATEFORMAT, DateFormat } from './types'

export const dateToFormat = (date: any, format?: DateFormat | DATEFORMAT, _?: any) => {
   try {
      if (!date) return '-'
      const dateObj = typeof date === 'string' ? new Date(date) : date
      let luxonDate = DateTime.fromJSDate(dateObj)

      switch (format) {
         case 'YMD':
            return luxonDate.toFormat('yyyy-LL-dd')
         case 'DMYHIS':
            return luxonDate.toFormat('dd-LL-yyyy HH:mm:ss')
         case 'My':
            return luxonDate.toFormat('dd-LL-yyyy HH:mm:ss')
         case 'DMY':
            return luxonDate.toFormat('dd-LL-yyyy')
         case 'MDY':
            return luxonDate.toFormat('LL-dd-yyyy')
         case 'YMDHIS':
            return luxonDate.toFormat('yyyy-LL-dd HH:mm:ss')
         case 'YMDHI':
            return luxonDate.toFormat('yyyy-LL-dd HH:mm')
         case 'DMYHI':
            return luxonDate.toFormat('dd-LL-yyyy HH:mm')
         case 'yM':
            return luxonDate.toFormat('yyyy-MM')
         default:
            return luxonDate.toFormat('yyyy-LL-dd')
      }
   } catch (e: any) {
      console.error(`error date ${e.message}`, date)
      return '-'
   }
}

export const getCurrentDate = () => {
   return DateTime.now().toFormat('yyyy-LL-dd')
}

export const dateTimeReport = () => {
   return DateTime.fromJSDate(new Date()).toFormat('ddLLyyyyHHmmss')
}

export const getMaxDate = (arr: any, columnName: any) => {
   const maxDate = new Date(
      Math.max(
         ...arr.map((element: any) => {
            return new Date(element[columnName])
         })
      )
   )

   return DateTime.fromJSDate(maxDate).toFormat('yyyy-LL-dd')
}

export const getMinDate = (arr: any, columnName: any) => {
   const minDate = new Date(
      Math.min(
         ...arr.map((element: any) => {
            return new Date(element[columnName])
         })
      )
   )

   return DateTime.fromJSDate(minDate).toFormat('yyyy-LL-dd')
}

export const isoStringToRelativeTime = (isoString: string) => {
   return DateTime.fromISO(isoString).toRelative()
}

export const getDiffDaysBetweenDate = (lowerDate: any, UpperDate: any) => {
   const dateLow = typeof lowerDate === 'string' ? new Date(lowerDate) : lowerDate
   const dateUp = typeof UpperDate === 'string' ? new Date(UpperDate) : UpperDate

   let luxonDateLow = DateTime.fromJSDate(dateLow)
   let luxonDateUp = DateTime.fromJSDate(dateUp)

   let intervalResult = Interval.fromDateTimes(luxonDateLow, luxonDateUp)

   return intervalResult.length('days')
}
