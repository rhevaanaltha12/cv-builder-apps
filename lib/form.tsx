export const handleFormFieldErrMsg = (errors: any, fieldName: string) => {
   let result = ''
   result = errors?.[fieldName]?.message

   let altErr: any = ''

   const arrFieldName = fieldName.split('.')
   if (arrFieldName.length > 1) {
      arrFieldName.forEach((str: any) => {
         const key = isNaN(str) ? str : parseInt(str)
         altErr = !altErr ? errors[key] : altErr[key]
      })
   }

   if (altErr) {
      result = altErr.message
   }

   return result
}
