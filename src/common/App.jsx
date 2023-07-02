import { useState } from 'react'
import './App.css'
import title from '../assets/Title.png';

function App() {

  return (
    <div className="landing-container">
      <div className="title">
        <img src={title} alt="logo"/>
        <h3>Inicia la conquista de la isla</h3>
      </div>
      <section id="buttons">
        <button id="see-button">
          <a href="/game">Iniciar juego</a>
        </button>
      </section>
      
      <section id="buttons">
        <button id="see-button">
          <a href="/about">Ver acerca del juego</a>
        </button>
      </section>

      <section id="buttons">
        <button id="see-button">
          <a href="/rules">Ver reglas del juego</a>
        </button>
      </section>

    </div>
  )
}

export default App
