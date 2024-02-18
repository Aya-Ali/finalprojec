import React, { useContext, useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Component/Home/Home'
import Layout from './Component/Layout/Layout'
import Products from './Component/Products/Products'
import Categories from './Component/Categories/Categories'
import Login from './Component/Login/Login'
import Register from './Component/Register/Register'
import NotFound from './Component/NotFound/NotFound'
import Cart from './Component/Cart/Cart'
import ForgetPassword from './Component/ForgetPassword/ForgetPassword'
import { UserContext, UserContextProvider } from './Context/userContext'
import GuradRouting from './Component/PorectedRouting/GuradRouting'
import ResetPassword from './Component/ResetPassword/ResetPassword'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import ProductDetails from './Component/ProductDetails/ProductDetails'
import { CartContextProvider } from './Context/cartContext'
import Allorders from './Component/Allorders/Allorders'
import Checkout from './Component/Checkout/Checkout'
export default function App() {
  let QueryClients = new QueryClient()

  let Routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "home", element: <GuradRouting><Home /> </GuradRouting> },
        { path: "products", element: <GuradRouting><Products /> </GuradRouting> },
        { path: "ProductDetails/:id", element: <GuradRouting><ProductDetails /> </GuradRouting> },
        { path: "Category", element: <GuradRouting><Categories /> </GuradRouting> },
        { path: "Cart", element: <GuradRouting><Cart /> </GuradRouting> },
        { path: "checkout/:id", element: <GuradRouting><Checkout /> </GuradRouting> },
        { path: "allorders", element: <GuradRouting><Allorders /> </GuradRouting> },
        { path: "ForgetPassword", element: <ForgetPassword /> },
        { path: "ResetPassword", element: <ResetPassword /> },
        { path: "login", element: <Login /> },
        { index: true, element: <Register /> },
        { path: "*", element: <NotFound /> },
      ]
    },

  ])


  return (
    <>
      <QueryClientProvider client={QueryClients}>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right'></ReactQueryDevtools>
        <CartContextProvider>

          <UserContextProvider>
            <RouterProvider router={Routes}></RouterProvider>
          </UserContextProvider>
        </CartContextProvider>
      </QueryClientProvider>




    </>

  )
}
