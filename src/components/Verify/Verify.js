import React, { useState } from 'react'
import Button from '../Button/Button'
import './Verify.scss'
export default function Verify() {
    const [field, setField] = useState(Array(6).fill(''))   // Array of 6 empty strings used for otp


    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false
        setField([...field.map((i, indx) => (indx === index) ? element.value : i)])   //get the value of the input and set it to the array

        if (element.nextSibling) {          //Focus on next element
            element.nextSibling.focus()
        }
    }
    const search = window.location.search;          //get the mobile number from the url
    const params = new URLSearchParams(search);
    const mobile = params.get('mobile');



    return (
        <div className="verify-container">
            <div className="verify__main">
                <div className="verification__title-container">
                    <h1>Verification Code</h1>
                    <p>We have sent the code verification to You Mobile
                        Number +91 {mobile}</p>
                </div>
                <div className="verify-form-wrapper">
                    <div className="verify__form">
                        {field && field.map((data, index) => (<input type="tel"
                            key={index}
                            name="otp"
                            value={data}
                            maxLength={1}
                            onFocus={e => e.target.select()}
                            onChange={(e) => { handleChange(e.target, index) }}
                            onKeyDown={(e) => {
                                if (e.code === 'Backspace' || e.keyCode === 8) {
                                    e.target.value = '';
                                    setField([...field.map((i, indx) => (indx === index) ? e.target.value : i)])
                                    e.target.previousSibling.focus()

                                }
                            }
                            }
                        />))}
                    </div>
                    <span className="code">Didn’t recieve code ?  <span className="request__again">Request again</span> </span>
                </div>
                <Button name="Continue" link='/home' />

            </div>
        </div>
    )
}
