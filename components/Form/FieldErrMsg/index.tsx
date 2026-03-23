import React from 'react'

function FieldErrMsg({ msg }: { msg: string }) {
   return (
      <small id="username2-help" className="p-error">
         {msg}
      </small>
   )
}

export default FieldErrMsg
