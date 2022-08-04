import React, { useState } from 'react'
import Button from '../Button/Button'
import './Verify.scss'
export default function Verify() {
    const [field, setField] = useState(Array(6).fill(''))

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false
        setField([...field.slice(0, index), element.value, ...field.slice(index + 1)])
        console.log(field)

        if (element.nextSibling) {
            element.nextSibling.focus()
        }
    }
    const search = window.location.search;
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
                            value={data}
                            maxLength={1}
                            onFocus={e => e.target.select()}
                            onChange={(e) => { handleChange(e.target, index) }}
                            onKeyDown={(e) => {
                                if (e.code === 'Backspace' || e.keyCode === 8) {
                                    e.target.value = '';
                                    setField([...field.slice(0, index), ...field.slice(index)])

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
