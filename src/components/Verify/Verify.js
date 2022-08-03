import React, { useState } from 'react'
import Button from '../Button/Button'
import './Verify.scss'

export default function Verify() {
  const  [field,setField] = useState(Array(6).fill(''))

    return (
        <div className="verify-container">
            <div className="verify__main">
                <div className="verification__title-container">
                    <h1>Verification Code</h1>
                    <p>We have sent the code verification to You Mobile
                        Number +91123456780</p>
                </div>
                <div className="verify-form-wrapper">
                    <div className="verify__form">
                    {field && field.map((items) =>(<input type="tel"
                    />))}
                    </div>
                    <span className="code">Didn’t recieve code ?  <span className="request__again">Request again</span> </span>
                    </div>
                    <Button name="Continue" />
                   
            </div>
        </div>
    )
}
