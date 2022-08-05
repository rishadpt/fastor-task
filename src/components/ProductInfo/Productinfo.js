import React, { useEffect, useRef, useState } from 'react'
import './Productinfo.scss'
import { fastorServices } from '../../utils/service'
import { Link, useParams } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { AiFillHeart, AiFillStar, AiOutlineShareAlt } from 'react-icons/ai'
import { MdEdit } from 'react-icons/md'
import Loader from '../Loader/Loader'

export default function Productinfo() {
  const wishlistRef = useRef('')                  // useRef is used to store the ref of wishlist button
  const { id } = useParams()                    // id is the product id
  const [image, setImage] = useState([])      // image array
  const [data, setData] = useState([])      // product data
  const firstref = useRef('')             // useRef is used for Slider first image
  const secondref = useRef('')            // useRef is used for Slider second image
  const thirdref = useRef('')            // useRef is used for Slider third image 
  const [wishlist, setwishlist] = useState(false)   // useState is used for wishlist
  const [loading, setLoading] = useState(false)     // useState is used for loading
  const [x, setX] = useState()                      // useState is used for X axis of Cursor
  const [y, setY] = useState()                      // useState is used for Y axis of Cursor
  const [edit, setEdit] = useState(false)           // useState is used for editmode
  const [constX, setConstX] = useState()            // useState is used for Const X axis of Cursor
  const [constY, setConstY] = useState()            // useState is used for Const Y axis of Cursor

  // wishlist active Inactive Function
  const wishlistActive = (action) => {
    if (action === 'add') {
      wishlistRef.current.classList.add('wishlist-active')
      setwishlist(true)
    }
    else if (action === 'remove') {
      wishlistRef.current.classList.remove('wishlist-active')
      setwishlist(false)
    }
  }

  //Slider Navigator Active or Inactive Actions using Ref
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

  //Get the position Of Cursor while Logo Positioning
  const getPosition = () => {
    window.addEventListener('mousemove', (e) => {
      setX(e.clientX - window.innerWidth / 2)
      setY(e.clientY - window.innerHeight / 2)
      if (window.innerWidth < 800) {
        setX(e.screenX - 100)
        setY(e.screenY - 200)
      }

    })
  }

  // Logo Position Edit will ON
  const editOn = () => {
    setEdit(true)
    getPosition()
  }

  // Logo Position Edit will Off
  const editOf = () => {
    setEdit(false)
    setConstX(x)
    setConstY(y)
    localStorage.setItem('x', x)
    localStorage.setItem('y', y)
  }

  //On Enter Press Edit mode off (Desktop only)
  window.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
      editOf()
    }
  }
  )



  //Mobile image Sharing Function  using Navigator
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


  useEffect(() => {
    localStorage.getItem('x')         //Take Previously saved axis from local storage
    localStorage.getItem('y')
    setConstX(localStorage.getItem('x'))
    setConstY(localStorage.getItem('y'))

    fastorServices.getRestaurants().then((data) => {

      let filter = data.filter((item) => item.restaurant_id === id)  // filter the data based on id
      setData(filter[0])                           // setData is used for product data
      setImage(filter[0].images)                  // setImage is used to set the image array
      setLoading(false)
    })
    document.title = data.restaurant_name
  }, [data])


  return (
    loading ? <Loader /> :
      <div className="productinfo-container">
        <div className="image-header" >
          {!edit && <Link to='/home'>
            <IoIosArrowBack />
          </Link>}

          <div className="share_container">
            <MdEdit onClick={() => { edit ? editOf() : editOn() }} />
            {!edit && <AiOutlineShareAlt onClick={handleOnClick} />}

            {!edit && <div className="share" ref={wishlistRef}>
              <AiFillHeart onClick={(e) => { wishlist ? wishlistActive('remove') : wishlistActive('add') }} />
            </div>}
          </div>

        </div>
        {image[0] ? image.map((item, index) => (
          <div id={index} key={index + 1} style={{ backgroundImage: ` url(${item.url})` }} className="walpapper-container">
            <img style={{ top: edit ? `${y}px` : constY + 'px', left: edit ? `${x}px` : constX + 'px' }} src='/Images/logo.png' alt="" />

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
            {Array(5).fill(0).map((i, index) => (
              <AiFillStar key={index} style={{ color: `${index < data?.rating?.restaurant_avg_rating ? '#FFC833' : null}` }} />))}

          </div>
        </div>

      </div>
  )
}
