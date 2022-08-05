import React from 'react'
import './Card.scss'
import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'
export default function Card({name,id,image,price,data}) {  
    
    return (
        <Link to={`/products/${id}`} id={id} className="card-container">
            <div className="image__container">
                <img src={image ? image : "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"} alt="" />
            </div>
            <div className="card-content">
                <h3>{name}</h3>
                <p>
                    Cake pastry,Pastas, Connaught place,New delhi
                </p>
            </div>
            <div className="star-container">
            {Array(5).fill(0).map((i, index) => (
          <AiFillStar  style={{ color: `${index < data?.rating?.restaurant_avg_rating ?'#FFC833' :null}` }} />))}
            </div>
            <div className="price">
                <p>{price}</p>
            </div>
        </Link>
    )
}
