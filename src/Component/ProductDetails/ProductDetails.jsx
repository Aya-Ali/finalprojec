import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'

import Swal from 'sweetalert2'
import { CartContext } from '../../Context/cartContext';
export default function ProductDetails() {

  let { addCart, setnumOfCartItems } = useContext(CartContext)
  let params = useParams()
  let [productId, setProductID] = useState()
  useEffect(() => {


    setProductID(params.id)
  }, [])
  let { data, isLoading } = useQuery(["productdetails", productId], getDetails)
  let product = data?.data.data

  console.log(isLoading);

  function getDetails(query) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${query.queryKey[1]}`)
  }


  function getSrc(e) {
    let imgPath = e.target.getAttribute("src");

    document.querySelector("#myImage").setAttribute("src", imgPath)
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
      {isLoading ? <div className='position-fixed bg-white loading top-0 end-0 start-0 bottom-0 z-3 d-flex justify-content-center align-items-center p-5'>
        <span className="loader"></span>
      </div> : <div className='container py-5'>
        <div className='row align-items-center'>
          <div className='col-md-3 '>

            <div className='row g-0 align-items-center'>
              <div className='col-md-2'>
                {product.images.map((elmenet) => {
                  return <img src={elmenet} onClick={getSrc} className='w-100 imgs' alt="" />
                })}


              </div>
              <div className='col-md-10'>
                <img src={product.imageCover} id='myImage' className='w-100' alt="" />
              </div>
            </div>
          </div>
          <div className='col-md-9 '>

            <h2>{product.title}</h2>
            <p className='text-muted my-3'> {product.description}</p>

            <h6 className='text-main'>{product.category.name}</h6>
            <div className='d-flex justify-content-between'>
              <span>{product.price}Egp</span>
              <span><i className='fa-solid fa-star rating-color'></i>  {product.ratingsAverage}  </span>
            </div>
            <button  onClick={()=>addToCart(product.id)} className='btn bg-main text-white w-100 d-block my-3'> Add Cart</button>
          </div>
        </div>
      </div>}
    </>

  )
}
