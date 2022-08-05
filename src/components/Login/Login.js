import { useState } from 'react'
import Button from '../Button/Button'
import './Login.scss'


export default function Login() {
    const [data, setData] = useState('')        // set Mobile number

    return (
        <div className="login-container">
            <div className="login-container__content">
                <div className="login-container__content__title">
                    <h1>Login</h1>
                    <div>
                        <p className="welcome__back">Welcome Back</p>
                        <p className="welcome__back" >Please Login to Continue</p>
                    </div>
                </div>
                <div className="login-container__content__form__input">
                    <div className="input-wrapper" >
                        <label>Mobile Number</label>
                        <div className="input__container">
                            <span>+91</span>
                            <input  onChange={(e) => { setData(e.target.value) }} maxLength={10} type="tel" placeholder="Enter Your Mobile Number" />
                        </div>
                    </div>
                    <Button  name="Request OTP" link={data.length ===10 ? `/otp?mobile=${data}`: '/'} />
                </div>

            </div>
        </div>
    )
}
