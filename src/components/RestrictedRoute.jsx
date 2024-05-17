import React from 'react'
import { useAuth } from '../context-data'
import { Navigate, useLocation } from 'react-router-dom'

function RestrictedRoute({children}) {

    let {data} = useAuth()

    let location = useLocation()
    // console.log(location);

if(!data.isLoggedIn){
    return <Navigate to='/' state={{path:location.pathname}}/>
}

  return children 
}

export default RestrictedRoute