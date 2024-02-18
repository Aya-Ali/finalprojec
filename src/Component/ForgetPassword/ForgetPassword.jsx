import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function ForgetPassword() {
    let [errmsg, setErr] = useState("")
    let nav = useNavigate()
    let [formStatus, setFormStatus] = useState(true)
    let validationSchema = Yup.object({
        email: Yup.string().required("email Required").email("enter Valid Email"),
    })
    let validationSchema2 = Yup.object({
        resetCode: Yup.string().required("resetCode Required").matches(/^[0-9]{5,6}$/, "enter Valid Code")
    })
    let Formik = useFormik({
        initialValues: {
            email: ""
        },
        onSubmit: ForgetPasswordAPi,
        validationSchema
    })

    let Formik2 = useFormik({
        initialValues: {
            resetCode: ""
        },
        onSubmit: verifyResetCode,
        validationSchema: validationSchema2
    })
    async function ForgetPasswordAPi(value) {
        console.log(value);
        let req = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, value).catch((err) => {
            console.log(err.response.data.message);
            setErr(err.response.data.message)
        })
        if (req.data.statusMsg == 'success') {
            // 
            setFormStatus(false)
        }
        console.log(req);
    }

    async function verifyResetCode(value) {
        let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', value).catch((err) => {
            setErr(err.response.data.message)
        })
        console.log(req);
        if (req.data.status == "Success") {
            nav('/ResetPassword')
        }
    }


    return (
        <div>
            {errmsg ? <div className='alert alert-danger'>
                {errmsg}
            </div> : ""}
            {formStatus ? <form onSubmit={Formik.handleSubmit}>
                <label htmlFor="email">Enter Your Email</label>
                <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} type='email' className='form-control' id='email' name='email' />
                <button type='submit' className='btn bg-main text-white'>Send</button>
            </form> :
                <form onSubmit={Formik2.handleSubmit}>
                    <label htmlFor="resetCode">Enter reset Code</label>
                    <input value={Formik2.values.resetCode} onBlur={Formik2.handleBlur} onChange={Formik2.handleChange} type='resetCode' className='form-control' id='resetCode' name='resetCode' />
                    {Formik2.errors.resetCode && Formik2.touched.resetCode ? <div className='alert alert-danger'>{Formik2.errors.resetCode}</div> : ""}

                    <button type='submit' className='btn bg-main text-white'>vriefy Code</button>
                </form>}





        </div>
    )
}
