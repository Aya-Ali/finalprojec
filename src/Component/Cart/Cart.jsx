import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/cartContext'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
export default function Cart() {
  let [CartData, setCartData] = useState(null)
  let [loading, setLoading] = useState(true)
  let { getUserCart, updateCart, clearCart, deleteCartItem, setnumOfCartItems } = useContext(CartContext)
  useEffect(() => {
    getUserData()
  }, [])

  async function getUserData() {
    setLoading(true)
    let req = await getUserCart().catch((err) => {
      console.log(err);
      if (err.response.data.statusMsg == 'fail') {
        setCartData(null)
        setLoading(false)
      }
    })
    if (req?.data?.data) {
      setLoading(false)
      setCartData(req.data.data)
      console.log(req.data.data);
    }
  }
  async function updateCartITem(id, count) {
    if (count == 0) {
      deleteITem(id)
    } else {
      let req = await updateCart(id, count)

      console.log(req);
      if (req.data.status == 'success') {
        setnumOfCartItems(req.data.numOfCartItems)
        setCartData(req.data.data)
        // Swal.fire({
        //   title: "Good job!",
        //   text: 'product Removed',
        //   icon: "success"
        // });
      }
    }

  }
  async function deleteITem(id) {
    let req = await deleteCartItem(id).catch((Err) => {
      console.log(Err);
    })
    console.log(req);
    if (req.data.status == 'success') {
      setnumOfCartItems(req.data.numOfCartItems)
      setCartData(req.data.data)
      Swal.fire({
        title: "Good job!",
        text: 'product Removed',
        icon: "success"
      });
    }
  }
  async function clearCartData() {
    let req = await clearCart()
    console.log(req);
    if (req.data.message == 'success') {
      setCartData(null)
    }
  }
  return (
    <div>

      <h2>Cart Data</h2>
      {loading ? <div className='position-fixed bg-white loading top-0 end-0 start-0 bottom-0 z-3 d-flex justify-content-center align-items-center p-5'>
        <span className="loader"></span>
      </div> : CartData != null ? <div className='container my-5 py-5 bg-light'>

        <button onClick={clearCartData} className='btn btn-danger float-end' >Empty Cart</button>
        <div className='clearfix'></div>

        {CartData.products.map((element) => {
          return <div className='row align-items-center py-3 border-bottom border-3'>
            <div className='col-md-10'>
              <div className='row align-items-center'>
                <div className='col-md-1'>
                  <img src={element.product.imageCover} className='w-100' alt="" />
                </div>
                <div className='col-md-10'>
                  <h4>{element.product.title}</h4>
                  <h6 className='text-muted'>price:{element.price}</h6>
                  <button onClick={() => deleteITem(element.product._id)} className='btn btn-danger'> Remove <i className='fa-solid fa-trash '></i></button>
                </div>
              </div>
            </div>
            <div className='col-md-2 d-flex'>
              <span className='btn btn-info btn-sm'>

                <i onClick={() => updateCartITem(element.product._id, element.count + 1)} className='fa-solid fa-plus'></i>

              </span>
              <span className='mx-2'>
                {element.count}

              </span>
              <span className='btn btn-danger btn-sm'>
                <i onClick={() => updateCartITem(element.product._id, element.count - 1)} className='fa-solid fa-minus'></i>

              </span>
            </div>
          </div>
        })}
        <h2>Total Price : {CartData.totalCartPrice}</h2>
        <Link to={'/checkout/' + CartData._id} className='btn bg-main text-white'>check Out Payment</Link>
      </div> : <div className='alert alert-danger my-5 '>
        Cart Empty
      </div>}
    </div>
  )
}
