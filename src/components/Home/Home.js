import React from 'react'
import Header from '../Header/Header'
import Products from './Products/Products'

export default function home() {
  return (
    <div className="home-container">
        <Header/>
        <Products/>
    </div>
  )
}
