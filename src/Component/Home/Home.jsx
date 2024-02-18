import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/userContext'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'

import Swal from 'sweetalert2'
import { CartContext } from '../../Context/cartContext'
export default function Home() {
  let { addCart, setnumOfCartItems } = useContext(CartContext)
  let [page, setPage] = useState(1)
  function getProducts(queryData) {
    console.log(queryData);
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${queryData.queryKey[1]}`)
  }
  let { isLoading, isError, isFetching, data, refetch } = useQuery(['productsApi', page], getProducts, {
    // cacheTime: 3000
    // refetchOnMount:false
    // refetchInterval:5000
    // staleTime: 2000
    // refetchOnWindowFocus:false
    // enabled:t
  })


  function getPageNumber(event) {
    let page = event.target.getAttribute('pageNum')
    setPage(page)

  }


  async function addToCart(id) {
    let req = await addCart(id).catch((err) => {
      Swal.fire({
        title: "Error",
        text: err.response.data.message,
        icon: "error"
      });
    })
    if (req.data.status == 'success') {

      setnumOfCartItems(req.data.numOfCartItems)

      Swal.fire({
        title: "Good job!",
        text: req.data.message,
        icon: "success"
      });
    }
    console.log(req);
  }
  return (
    <>
      <MainSlider></MainSlider>
      <CategorySlider></CategorySlider>


      <div className='container-fuild mt-5'>
        {/* <button className='btn btn-info' onClick={refetch}>Get Data</button> */}
        <div className='row g-3'>
          {
            isLoading ? <div className='position-fixed bg-white loading top-0 end-0 start-0 bottom-0 z-3 d-flex justify-content-center align-items-center p-5'>
              <span className="loader"></span>
            </div> : data?.data.data.map((item) => {
              return <div key={item.id} className='col-md-2'>

                <div className='product cursor-pointer'>
                  <Link to={`/ProductDetails/${item.id}`}>
                    <img src={item.imageCover} className='w-100' alt="" />

                    <h6 className='text-main'>{item.category.name}</h6>
                    <h3 className=''>{item.title.split(' ').slice(0, 2).join(" ")}</h3>
                    <div className='d-flex justify-content-between'>
                      <span>{item.price}Egp</span>
                      <span><i className='fa-solid fa-star rating-color'></i>{item.ratingsAverage}</span>
                    </div>


                  </Link>
                  <button onClick={() => addToCart(item.id)} className='btn bg-main text-white d-block w-100'>Add to Cart</button>
                </div>
              </div>
            })
          }

        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center my-5">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item"><a className="page-link" pageNum='1' onClick={getPageNumber} >1</a></li>
            <li className="page-item"><a className="page-link" pageNum='2' onClick={getPageNumber}>2</a></li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}


