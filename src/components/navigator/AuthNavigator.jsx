import React from 'react'
import { useAuth } from '../providers/AuthProvider'
import { Navigate } from 'react-router-dom'

function AuthNavigator({ children }) {
  const { isLoggedIn } = useAuth()
  return (
    isLoggedIn ?
      children
      :
      <Navigate to='/' />
  )
}

export default AuthNavigator
