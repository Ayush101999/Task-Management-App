import React from 'react'

/* Alert component */
/* This component is used to display alert messages on the screen */
export default function Alert(props) {
  return (
    <>
    
    <div style={{height : '50px'}} role="alert">
    {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`}>
        <strong><i className="fa-solid fa-circle-exclamation"></i></strong> {props.alert.msg}
    </div>}
    </div>
    </>

   
  )
}
