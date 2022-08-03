import React from 'react'
import Button from '../Button/Button'
import './Login.scss'
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <div className="login-container">
            <div className="login-container__content">
                <div className="login-container__content__title">
                    <h1>Login</h1>
                    <div>
                        <p className="welcome__back">Welcome Back</p>
                        <p>Please Login to Continue</p>
                    </div>
                </div>
                    <div className="login-container__content__form__input">
                        <div className="input-wrapper" >
                            <label>Mobile Number</label>
                            <div className="input__container">
                                <span>+91</span>
                                <input type="text" placeholder="Enter Your Mobile Number" />
                            </div>
                        </div>
                 
                        <Button name="Request OTP" />
    
                    </div>
                  
            </div>
        </div>
    )
}
