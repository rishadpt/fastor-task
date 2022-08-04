import React, { useEffect, useRef, useState } from 'react'
import './Productinfo.scss'
import { fastorServices } from '../../utils/service'
import { Link, useParams } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { AiFillHeart, AiFillStar, AiOutlineShareAlt } from 'react-icons/ai'
import { MdEdit } from 'react-icons/md'
import Loader from '../Loader/Loader'

export default function Productinfo() {
  const wishlistRef = useRef('')
  const { id } = useParams()
  const [image, setImage] = useState([])
  const [data, setData] = useState([])
  const firstref = useRef('')
  const secondref = useRef('')
  const thirdref = useRef('')
  const [wishlist, setwishlist] = useState(false)
  const [loading, setLoading] = useState(false)
  const [x, setX] = useState()
  const [y, setY] = useState()
  const [edit, setEdit] = useState(false)
  const [constX, setConstX] = useState()
  const [constY, setConstY] = useState()

  const wishlistActive = (action) => {
    if (action === 'add') {
      console.log(wishlistRef.current)
      wishlistRef.current.classList.add('wishlist-active')
      setwishlist(true)
    }
    else if (action === 'remove') {
      wishlistRef.current.classList.remove('wishlist-active')
      setwishlist(false)
    }
  }


  const slider = (action) => {
    if (action === 1) {
      firstref.current.classList.add('slider__active')
      secondref.current.classList.remove('slider__active')
      thirdref.current.classList.remove('slider__active')
    }
    else if (action === 2) {
      secondref.current.classList.add('slider__active')
      firstref.current.classList.remove('slider__active')
      thirdref.current.classList.remove('slider__active')
    }
    else if (action === 3) {
      thirdref.current.classList.add('slider__active')
      firstref.current.classList.remove('slider__active')
      secondref.current.classList.remove('slider__active')
    }
  }

  const getPosition = () => {
    window.addEventListener('mousemove',(e)=>{
    setX(e.screenX-100)
    setY(e.screenY-200)
})
  }

  
  useEffect(() => {
      localStorage.getItem('x')
      localStorage.getItem('y')
      setConstX(localStorage.getItem('x'))
      setConstY(localStorage.getItem('y'))

    fastorServices.getRestaurants().then((data) => {

      let filter = data.filter((item) => item.restaurant_id === id)
      setData(filter[0])
      setImage(filter[0].images)
      setLoading(false)
    })
    document.title = data.restaurant_name
  }, [data])

  const handleOnClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${data.restaurant_name}`,
          text: `Check out  ${data.restaurant_name} on ${document.location.hostname} ${image[0].url}`,
        })
        .then(() => {
          console.log('Successfully shared');
        })
        .catch(error => {
          console.error('Something went wrong sharing the image', error);
        });
    }
  };

  const editOn = ()=>{
    setEdit(true)
    getPosition()
  }

  const editOf = ()=> {
    setEdit(false)
    setConstX(x)
    setConstY(y)
    localStorage.setItem('x', x)
    localStorage.setItem('y', y)
  }

  return (
    loading ? <Loader /> :
      <div  className="productinfo-container">
        <div className="image-header" >
         {!edit  && <Link to='/home'>
            <IoIosArrowBack />
          </Link>}

          <div className="share_container">
            <MdEdit onClick={() => {edit ? editOf()  : editOn() }} />
           {!edit  && <AiOutlineShareAlt onClick={handleOnClick} />}

           {!edit  && <div className="share" ref={wishlistRef}>
              <AiFillHeart onClick={(e) => { wishlist ? wishlistActive('remove') : wishlistActive('add') }} />
            </div>}
          </div>

        </div>
        {image[0] ? image.map((item, index) => (
          <div   id={index} key={index+1} style={{ backgroundImage: ` url(${item.url})` }} className="walpapper-container">
            <img style={{ top: edit ? `${y}px` : constY+'px', left: edit ? `${x}px` : constX+'px' }} src='/Images/logo.png' alt="" />

          </div>)) : <Loader />}
        <div className="arrows">
          <div ref={firstref} onClick={() => { slider(1) }} className="slider__active slider__dot"></div>
          <div ref={secondref} onClick={() => { slider(2) }} className="slider__dot " ></div>
          <div onClick={() => { slider(3) }} ref={thirdref} className="slider__dot "></div>
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
            {Array(5).fill(0).map((index) => (
              <AiFillStar key={index} style={{ color: `${index < data?.rating?.restaurant_avg_rating ? '#FFC833' : null}` }} />))}

          </div>
        </div>

      </div>
  )
}
