export const isUrl = (str: string): boolean => {
   if (!str) return false
   return /^(https?:\/\/|www\.)|(\.(com|org|net|io|dev|me|co|app|design))/i.test(str)
}

export const formatUrlDisplay = (url: string): string => {
   if (!url) return ''
   return url.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '')
}

export const ensureProtocol = (url: string): string => {
   if (!url) return ''
   if (/^https?:\/\//i.test(url)) return url
   if (url.includes('@') && !url.includes('/')) return `mailto:${url}`
   return `https://${url}`
}

export const formatMonth = (dateStr: string): string => {
   const [year, month] = dateStr.split('-')
   if (!year || !month) return dateStr
   const date = new Date(parseInt(year), parseInt(month) - 1)
   return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

/**
 * Format a date range for display (e.g., "Jan 2020 - Present")
 */
export const formatDate = (start?: string, end?: string, current?: boolean): string => {
   if (!start) return ''
   const startFormatted = formatMonth(start)
   const endFormatted = current ? 'Present' : end ? formatMonth(end) : ''
   return endFormatted ? `${startFormatted} - ${endFormatted}` : startFormatted
}

export const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

export function capitalizeFirstLetter(str: string) {
   if (typeof str !== 'string' || str.length === 0) {
      return str
   }
   return str.charAt(0).toUpperCase() + str.slice(1)
}
