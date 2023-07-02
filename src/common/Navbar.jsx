import { useState } from 'react'
import './Navbar.css'
import logo from '../assets/Logo1.png'
import LogoutButton from '../profile/Logout'

function Navbar() {

  return (
    <div className="topnav">
        <a href="/" id="logo"><img src={logo}/></a>
        <a href="/">Home</a>
        <a href="/team">Acerca del equipo</a>
        <a href="/about">Acerca del juego</a>
        <a href="/rules">Reglas y Opciones</a>
        <a href="/game">Juego</a>
        <LogoutButton></LogoutButton>
    </div>
  )
}

export default Navbar
