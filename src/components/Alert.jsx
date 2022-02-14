import React from 'react'

const Alert = (props) => {
    return (<div className="position-absolute w-100">
        {
            props.alert && <div className={`alert alert-${props.alert.type} `} role="alert">
                {props.alert.msg}
            </div>
        }
    </div>
    )
}
export default Alert