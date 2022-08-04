import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'
import { IoIosArrowBack } from 'react-icons/io'
import { BsSearch } from 'react-icons/bs'

export default function Header() {
    return (
        <div className="header-container">
                <Link className="back__arrrow-container" to="/">
                    <IoIosArrowBack /> 
                    <h1 >Connaught place</h1>
                </Link>
            <BsSearch style={{fontSize:' 1.5rem ',cursor:'pointer'}}/>

        </div>
    )
}
