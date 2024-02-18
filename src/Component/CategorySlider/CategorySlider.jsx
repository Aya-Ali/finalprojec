import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default function CategorySlider() {

    let [categoryList, setCategory] = useState([])
    useEffect(() => {
        getCategory()
    }, [])
    async function getCategory() {
        let req = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")

        setCategory(req.data.data)
    }
    return (
        <div>

            <h2>Categories</h2>

            <OwlCarousel items={7} loop autoplay>
                {categoryList.map((element) => {
                    return <div className='item'>
                        <img src={element.image} height={250} alt="" />
                    </div>
                })}
            </OwlCarousel>
        </div>
    )
}
