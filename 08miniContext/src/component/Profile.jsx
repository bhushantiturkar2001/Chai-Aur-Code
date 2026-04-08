import { useContext} from "react";
import UserContext from "../context/UserContext";

import React from 'react'

function Profile() {
  const {user} = useContext(UserContext)

  if(!user) return <div>Login karo</div>

  return <div>Login ho gaye {user.username}</div>
}

export default Profile