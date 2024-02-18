import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { UserContext } from '../../Context/userContext'
import { CartContext } from '../../Context/cartContext'

export default function Layout() {
  let { setToken } = useContext(UserContext)
  let { getUserCart ,setnumOfCartItems} = useContext(CartContext)
  useEffect(() => {

    if (localStorage.getItem("userToken") != null) {
      setToken(localStorage.getItem("userToken"))

      getUserData()

    }
  }, [])
  async function getUserData() {
    let req = await getUserCart().catch(()=>{})
    console.log(req);
    if(req?.data?.status == 'success'){
      setnumOfCartItems(req.data.numOfCartItems)
    }
  }
  return (
    <div>

      <Navbar />
      <div className='container py-5 mt-5'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
