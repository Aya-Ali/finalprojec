import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { CartContext } from '../../Context/cartContext'
export default function Checkout() {
    let { CheckoutPayment } = useContext(CartContext)
    let data = useParams()
    let validationSchema = Yup.object({
        city: Yup.string().required("city Required").matches(/^\w{3,}$/, "enter valid city"),
        phone: Yup.string().required("phone Required").matches(/^01[1250][0-8]{8}$/, "enter valid city"),
        details: Yup.string().required("details Required").matches(/^\w{3,}$/, "enter valid details"),
    })
    let formik = useFormik({
        initialValues: {
            city: "",
            phone: "",
            details: ""
        }, validationSchema
        ,
        onSubmit: checkoutPay
    })
    async function checkoutPay(val) {

        let req = await CheckoutPayment(data.id, val)
        if (req.data.status == 'success') {

            window.open(req.data.session.url)
        }
        console.log(req);
    }
    return (
        <div>

            <form onSubmit={formik.handleSubmit}>



                <div className='mb-3'>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control' placeholder='Enter City' name="city" id="" />
                    {(formik.touched.city && formik.errors.city) ? <p className='text-danger'>{formik.errors.city}</p> : ""}
                </div>

                <div className='mb-3'>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className='form-control' placeholder='Enter phone' name="phone" id="" />
                    {(formik.touched.phone && formik.errors.phone) ? <p className='text-danger'>{formik.errors.phone}</p> : ""}
                </div>

                <div className='mb-3'>
                    <textarea onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control' placeholder='Enter details' name="details" id="" ></textarea>
                    {(formik.touched.details && formik.errors.details) ? <p className='text-danger'>{formik.errors.details}</p> : ""}
                </div>

                <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white d-block w-100'>Pay <i className='fa-brands fa-cc-visa'></i></button>
            </form>
        </div>
    )
}
