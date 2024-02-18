import axios from 'axios'
import { createContext, useState } from 'react'

export let CartContext = createContext()

export function CartContextProvider({ children }) {

    let [numOfCartItems, setnumOfCartItems] = useState(0)

    function getUserCart() {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        return axios.get("https://ecommerce.routemisr.com/api/v1/cart", options)
    }
    function addCart(id) {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        let body = {
            productId: id
        }
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart", body, options)
    }
    function deleteCartItem(id) {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, options)
    }
    function clearCart() {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, options)
    }
    function updateCart(id, count) {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        let body = {
            count: count
        }
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, body, options)
    }
    function CheckoutPayment(id, data) {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        let body = {

            shippingAddress: data

        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,body,options)
    }
    return <CartContext.Provider value={{CheckoutPayment, updateCart, clearCart, deleteCartItem, getUserCart, addCart, setnumOfCartItems, numOfCartItems }}>

        {children}
    </CartContext.Provider>
}