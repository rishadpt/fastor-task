import React, { useState } from 'react'
import { fastorServices } from '../../utils/service'
import Button from '../Button/Button'
import './Verify.scss'
import { useNavigate } from 'react-router-dom'

export default function Verify() {
    const [field, setField] = useState(Array(6).fill(''))   // Array of 6 empty strings used for otp
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

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

    const handleSubmit = (data) => {            //submit the otp
        if (data.join('') !== '') {
            let postData = {
                phone: mobile,
                otp: data.join('')
            }
            fastorServices.postLogin(postData).then((res) => {
                setLoading(true);
                if (res.status === 'Success') {
                    localStorage.setItem("AccessToken", res.data?.token)
                    navigate('/home')
                } else {
                    setErr(true)

                }
                setLoading(false)
            }
            )
        }
    }


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
                    {err ? <span className="err">Sorry Otp is wrong </span> : null}

                </div>
                <Button action={() => handleSubmit(field)} name="Continue" />

            </div>
        </div>
    )
}
