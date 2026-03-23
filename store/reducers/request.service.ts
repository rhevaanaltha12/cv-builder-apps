import { REQ_TYPE } from '@/constant/const'
import { handlePost, reqIsSuccess } from '@/constant/request'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const reqPost: any = createAsyncThunk(
   'request/reqPost',
   async ({ url, body, options }: { options?: any; url: string; body: any }, { rejectWithValue }) => {
      try {
         const req = await handlePost(url, body, options ? options : {})

         if (reqIsSuccess(req)) {
            return req
         } else {
            return rejectWithValue(req)
            // throw Error(getReqErrMsg(req, MESSAGES.ERROR_NA))
         }
      } catch (e: any) {
         return rejectWithValue({
            type: REQ_TYPE.OTHERS,
            message: e.message,
         })
      }
   }
)
