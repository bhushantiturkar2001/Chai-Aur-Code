import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../api/auth'



function LogoutBtn() {

  const dispatch = useDispatch()
  const logoutHandler = ()=>{
    authService.logout().then(()=>{
        dispatch(logout())
    })
  }

  return (
    <div>LogoutBtn</div>
  )
}

export default LogoutBtn