import React from 'react'
import './Card.scss'
import {AiFillStar} from 'react-icons/ai'

export default function Card() {
    return (
        <div className="card-container">
            <div className="image__container">
                <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="" />
            </div>
            <div className="card-content">
                <h3>Lazy Bear </h3>
                <p>
                    Cake pastry,Pastas, Connaught place,New delhi
                </p>
            </div>
            <div className="star-container">
               <AiFillStar style={{color:'#FFC833'}}/>
               <AiFillStar style={{color:'#FFC833'}}/>
               <AiFillStar style={{color:'#FFC833'}}/>
               <AiFillStar style={{color:'#FFC833'}}/>
               <AiFillStar />
            </div>
            <div className="price">
                <p>₹200</p>
            </div>

        </div>
    )
}
