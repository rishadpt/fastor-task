import React, { useEffect, useState } from 'react'
import { fastorServices } from '../../../utils/service';
import Card from './Card/Card'
import './Products.scss'

export default function Products() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fastorServices.getRestaurants().then(data => {
            setData(data)
            setLoading(false)
        })
    }, []);
    console.log(data)

    return (
        loading ? <div>Loading...</div> :
        <div className="products-container">
            {data?.map((item, index) => (
               <Card data={item}image={item.cover_image} price={item.avg_cost_for_two} name={item.restaurant_name} id={item.restaurant_id} key={index}  />
                ))}
           
        </div>
    )
}
