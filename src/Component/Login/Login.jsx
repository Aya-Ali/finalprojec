import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { UserContext } from '../../Context/userContext'
import { jwtDecode } from 'jwt-decode'
import { CartContext } from '../../Context/cartContext'

export default function Login() {
  let { setToken } = useContext(UserContext)
  let navg = useNavigate()
  let { getUserCart ,setnumOfCartItems} = useContext(CartContext)
  let [errMessage, setErrMessage] = useState("")
  let [loading, setLoading] = useState(true)
  let validationSchema = Yup.object({
    email: Yup.string().required("email Required").email("enter Valid Email"),
    password: Yup.string().required("password Required").matches(/^[A-Z][a-zA-Z!@#$%^*(_0-9]{6,16}$/, "enter Valid Password"),
  })
  let formik = useFormik({
    initialValues: {

      email: "",
      password: "",

    },
    onSubmit: LoginUser,
    validationSchema

  })
  async function getUserData() {
    let req = await getUserCart()
    console.log(req);
    if(req.data.status == 'success'){
      setnumOfCartItems(req.data.numOfCartItems)
    }
  }
  async function LoginUser(value) {
    setLoading(false)
    let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', value).catch((err) => {
      setErrMessage(err.response.data.message)
      setLoading(true)
    })
    if (req?.data.message == 'success') {
      console.log(req.data);
      setLoading(true)
     localStorage.setItem("userToken",req.data.token)
      setToken(req.data.token)
      getUserData()
      navg("/home")
    }

  }

  return (
    <div>
      <h2 >Login Now......</h2>
      {errMessage != "" ? <div className='alert alert-danger'>{errMessage}</div> : ""}
      <form onSubmit={formik.handleSubmit}>


        <div className='mb-3'>
          <label htmlFor="email">Email</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' type="email" name="email" id="email" />
          {(formik.errors.email && formik.touched.email) ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}

        </div>

        <div className='mb-3'>
          <label htmlFor="password">Password</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' type="password" name="password" id="password" />
          {(formik.errors.password && formik.touched.password) ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}
        </div>

        <Link to='/ForgetPassword'>ForgetPassword.....?</Link>
        <br />
        {loading ? <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white' type='submit'>Login</button>
          : <button className='btn bg-main text-white' type='button'>
            <i className='fa-solid fa-spinner fa-spin'></i>
          </button>}

      </form>


    </div>
  )
}
