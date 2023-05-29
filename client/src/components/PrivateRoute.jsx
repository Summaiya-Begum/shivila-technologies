import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

export default function PrivateRoute({ children }) {
    const navigate = useNavigate()
    useEffect(() => {
        const userValidation = JSON.parse(localStorage.getItem("user"))
        if (!userValidation) {
            navigate("/signup")
            return
        }
    })
    return (
        <>
        <Navbar/>
        <div>{children}</div> 
        </>
    )
}
