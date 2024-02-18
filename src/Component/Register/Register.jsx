import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Register() {
  let navg = useNavigate() 
  let [errMessage, setErrMessage] = useState("")
  let [loading, setLoading] = useState(true)
  let validationSchema = Yup.object({
    name: Yup.string().required('name is Required').min(3, "min char 3").max(20, "max char 20"),
    email: Yup.string().required("email Required").email("enter Valid Email"),
    password: Yup.string().required("password Required").matches(/^[A-Z][a-zA-Z!@#$%^*(_0-9]{6,16}$/, "enter Valid Password"),
    rePassword: Yup.string().required('Re Password').oneOf([Yup.ref("password")], "RePAssword  Not Match"),
    phone: Yup.string().required("phone Required").matches(/^01[1250][0-9]{8}$/, "enter Valid Phone")
  })
  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: ""
    },
    onSubmit: RegisterForm,
    validationSchema

  })

  async function RegisterForm(value) {
    setLoading(false)
    let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', value).catch(function (err) {
      setErrMessage(err.response.data.message)
      setLoading(true)
      console.log();
    })
    if (req?.data.message == 'success') {

      navg('/login')
      setLoading(true)
    }
    console.log(req);
  }

  return (
    <div>
      <h2 >Register Now......</h2>
      {errMessage != "" ? <div className='alert alert-danger'>{errMessage}</div> : ""}
      <form onSubmit={formik.handleSubmit}>

        <div className='mb-3'>
          <label htmlFor="name">Name</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' type="text" name="name" id="name" />
          {(formik.errors.name && formik.touched.name) ?
            <div className='alert alert-danger'>
              {formik.errors.name}
            </div> : ""}


        </div>
        <div className='mb-3'>
          <label htmlFor="email">Email</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' type="email" name="email" id="email" />
          {(formik.errors.email && formik.touched.email) ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}

        </div>
        <div className='mb-3'>
          <label htmlFor="phone">Phone</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' type="tal" name="phone" id="phone" />
          {(formik.errors.phone && formik.touched.phone) ? <div className='alert alert-danger'>{formik.errors.phone}</div> : ""}
        </div>
        <div className='mb-3'>
          <label htmlFor="password">Password</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' type="password" name="password" id="password" />
          {(formik.errors.password && formik.touched.password) ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}
        </div>
        <div className='mb-3'>
          <label htmlFor="rePassword">rePassword</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' type="password" name="rePassword" id="rePassword" />
          {(formik.errors.rePassword && formik.touched.rePassword) ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : ""}
        </div>

        {loading ? <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white' type='submit'>Register</button>
          : <button className='btn bg-main text-white' type='button'>
            <i className='fa-solid fa-spinner fa-spin'></i>
          </button>}

      </form>


    </div>
  )
}
