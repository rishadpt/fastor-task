import React, { useEffect, useRef, useState } from 'react'
import './Productinfo.scss'
import { fastorServices } from '../../utils/service'
import { Link, useParams } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { AiFillHeart, AiFillStar } from 'react-icons/ai'

export default function Productinfo() {
  const wishlistRef = useRef('')
  const { id } = useParams()
  const [image, setImage] = useState([])
  const [data, setData] = useState([])
  const firstref = useRef('')
  const secondref = useRef('')
  const thirdref = useRef('')

  
  const wishlistActive = (action) => {
    if (action === 'add') {
      console.log(wishlistRef.current)
      wishlistRef.current.classList.add('wishlist-active')
    }
    if (action === 'remove') {
      wishlistRef.current.classList.remove('wishlist-active')
    }
    
  }

  const slider = (action) => {
    if(action === 1){
      firstref.current.classList.add('slider__active')
      secondref.current.classList.remove('slider__active')
      thirdref.current.classList.remove('slider__active')
    }
    if(action === 2){
      secondref.current.classList.add('slider__active')
      firstref.current.classList.remove('slider__active')
      thirdref.current.classList.remove('slider__active')
    }
    if(action === 3){
      thirdref.current.classList.add('slider__active')
      firstref.current.classList.remove('slider__active')
      secondref.current.classList.remove('slider__active')
    }
  }

   

  useEffect(() => {
    fastorServices.getRestaurants().then((data) => {

      let filter = data.filter((item) => item.restaurant_id === id)
      setData(filter[0])
      setImage(filter[0].images)

    })
  }, [])
 console.log(image)
  return (
    <div className="productinfo-container">
      <div className="image-header" >
        <Link to='/home'>
          <IoIosArrowBack />
        </Link>
        <div className="div" ref={wishlistRef}>
        <AiFillHeart onClick={(e)=>{ wishlistActive('add')}}  />
        </div>
        
      </div>
      {image && image.map((item, index) => (
        <div key={index} style={{ backgroundImage: ` url(${item.url})` }} className="walpapper-container">
      <img src='/Images/logo.png' alt="" />
         
        </div>))}
      <div className="arrows">
        <div ref={firstref} onClick={()=>{slider(1)}}   className="slider__active slider__dot"></div>
        <div ref={secondref} onClick={()=>{slider(2)}}   className="slider__dot " ></div>
        <div onClick={()=>{slider(3)}}ref={thirdref}  className="slider__dot "></div>
      </div>
      <div className="product__info">
        <div className="title__price">
          <h1>{data.restaurant_name}</h1>
          <p>$ {data.avg_cost_for_two}</p>
        </div>
        <p>
          Cake pastry,Pastas, Connaught place,New delhi
        </p>
        <span>
          350g
        </span>
        <div className="star_container">
          {Array(5).fill(0).map((item, index) => (
            <AiFillStar style={{ color: `${index < data?.rating?.restaurant_avg_rating ? '#FFC833' : null}` }} />))}

        </div>
      </div>

    </div>
  )
}
