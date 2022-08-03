import React from 'react'
import { Link } from 'react-router-dom'
import './Button.scss'

export default function Button({name}) {
  return (
   <Link className="button-container" to="/otp">
    {name}
   </Link>
  )
}
