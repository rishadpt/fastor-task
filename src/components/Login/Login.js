import { useState } from 'react'
import { fastorServices } from '../../utils/service'
import Button from '../Button/Button'
import './Login.scss'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [data, setData] = useState('')        // set Mobile number
    const navigate = useNavigate()

    const handleSubmit = (data) => {
        fastorServices.postRegister(data).then(res => {
           if(res.status === 'Success') {
            navigate(`/otp?mobile=${data}`)
            setData(true)
           }else{
            setData(false)
           }
        }
        )

    }
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
                            <input onChange={(e) => { setData(e.target.value) }} maxLength={10} type="tel" placeholder="Enter Your Mobile Number" />
                        </div>
                    </div>
                    <Button disabled={!data} action={() =>  handleSubmit(data) } name="Request OTP" />
                </div>

            </div>
        </div>
    )
}
