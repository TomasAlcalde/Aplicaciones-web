import React, {useContext, useState} from 'react';
import './Login.css';
import { AuthContext } from '../auth/AuthContext';


const LogoutButton = () => {
  const {logout} = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  
  const handleLogout = () => {
    logout();
    window.location.reload();
    setMsg("Has hecho logout con éxito!")
  }
  
  const loggedIn = () => {
    var user = JSON.parse(localStorage.getItem("user_id"));
    if (user) {
      if (Number.isFinite(user.id)) {
        return true;
      }
      return false;
    }
  }

  return (
    <>
        {loggedIn() ? <button onClick={handleLogout}>Cerrar sesión</button>:
        <><a href='/login'>Login</a>
        <a href='/signup'>Registro</a></>}
    </>
  );
}

export default LogoutButton;