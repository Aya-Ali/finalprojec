import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function ResetPassword() {
  let navg =   useNavigate()
    let validationSchema = Yup.object({
        email: Yup.string().required("email Required").email("enter Valid Email"),
        newPassword: Yup.string().required("newPassword Required").matches(/^[A-Z][a-zA-Z!@#$%^*(_0-9]{6,16}$/, "enter Valid newPassword"),
    })
    let form = useFormik({
        initialValues: {
            email: '',
            newPassword: ''
        },
        onSubmit: ResetPasswordApi,
        validationSchema
    })

    async function ResetPasswordApi(Val) {
        let req = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', Val)
        if (req.data.token) {
            navg('/login')
        }
        console.log(req);
    }
    return (
        <div>

            <h2>ResetPassword</h2>
            <form onSubmit={form.handleSubmit}>


                <div className='mb-3'>
                    <label htmlFor="email">Email</label>
                    <input onBlur={form.handleBlur} onChange={form.handleChange} className='form-control' type="email" name="email" id="email" />
                    {(form.errors.email && form.touched.email) ? <div className='alert alert-danger'>{form.errors.email}</div> : ""}

                </div>

                <div className='mb-3'>
                    <label htmlFor="newPassword">newPassword</label>
                    <input onBlur={form.handleBlur} onChange={form.handleChange} className='form-control' type="password" name="newPassword" id="newPassword" />
                    {(form.errors.newPassword && form.touched.newPassword) ? <div className='alert alert-danger'>{form.errors.newPassword}</div> : ""}
                </div>
                <button disabled={!(form.isValid && form.dirty)} className='btn bg-main text-white' type='submit'>Update Password</button>

            </form>
        </div>
    )
}
