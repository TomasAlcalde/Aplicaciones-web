import { useState } from 'react'
import './Team.css'
import benja from '../assets/team/Benjamin_Diaz.png'
import tomas from '../assets/team/Tomas_Alcalde.jpeg'

function Team() {

  return (
    <div className="instructions-container">
      <h1 className="page-heading">El equipo</h1>

      <div className="cards-box">
        <div id="card">
          <img src = {benja}/> 
          <div className="nombre"> Nombre: Benjamín Díaz</div>
          <div className="caracteristica"> Año de la carrera: 4to año</div>
          <div className="caracteristica"> Major y Minor: Investigaciones Operativas - TI</div>
          <div className="caracteristica"> Hobbies: Jugar Rugby y salir con amigos</div>
          <div className="caracteristica"> Lugar de Origen: Temuco</div>
          <div className="caracteristica"> Dato freak: Tengo una costilla de mas</div>
        </div>

        <div id="card">
          <img src= {tomas}/> 
          <div className="nombre"> Nombre: Tomás Alcalde</div>
          <div className="caracteristica"> Año de la carrera: 4to año</div>
          <div className="caracteristica"> Major y Minor: Software - Biología</div>
          <div className="caracteristica"> Hobbies: Andar en moto y jugar Rugby</div>
          <div className="caracteristica"> Lugar de Origen: Temuco</div>
          <div className="caracteristica"> Dato freak: He tenido 8 especies de mascotas diferentes </div>
        </div>
      </div>
    </div>
  )
}

export default Team