import React from 'react'
import { Link } from 'react-router-dom'
import './Button.scss'

export default function Button({name,action}) {
  return (
   <button onClick={action} className="button-container"  >
    {name}
   </button>
  )
}
