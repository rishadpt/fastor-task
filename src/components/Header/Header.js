import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'
import { IoIosArrowBack } from 'react-icons/io'
import { BsSearch } from 'react-icons/bs'

export default function Header() {
    return (
        <div className="header-container">
            <div className="back__arrrow-container">
                <Link to="/">
                    <IoIosArrowBack />
                </Link>
                <h1>Connaught place</h1>
            </div>
            <BsSearch style={{fontSize:' 1.5rem '}}/>

        </div>
    )
}
