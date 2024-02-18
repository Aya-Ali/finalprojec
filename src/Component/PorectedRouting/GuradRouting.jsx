

import React from 'react'
import Home from '../Home/Home'
import Login from '../Login/Login'
import { Link, Navigate } from 'react-router-dom'
export default function GuradRouting({children}) {
    if (localStorage.getItem("userToken") != null) {
        return children
    } else {
        return <Navigate to='/login' />
    }
}
