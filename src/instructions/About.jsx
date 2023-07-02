import { useState } from 'react'
import './About.css'
import Tile from '../game/Tile'
import board from '../assets/Board2.png'
import wood from '../assets/tiles/Woods1.png'
import wheat from '../assets/tiles/Wheat1.png'
import desert from '../assets/tiles/Desert1.png'
import clay from '../assets/tiles/Clay1.png'
import sheep from '../assets/tiles/Sheep1.png'
import mountain from '../assets/tiles/Mountains1.png'

function About() {
  const cards =[
    { id: 1, imgSrc: wood, desc: "Los bosques producen madera"},
    { id: 2, imgSrc: clay, desc: "Los cerros producen arcilla"},
    { id: 3, imgSrc: sheep, desc: "Las praderas producen estambre"},
    { id: 4, imgSrc: wheat, desc: "Los campos producen trigo"},
    { id: 5, imgSrc: mountain, desc: "Las montañas producen rocas"},
    { id: 6, imgSrc: desert, desc: "El desierto no produce nada"}
  ];

  return (
    <div className="instructions-container">
      <h1 className="page-heading">Acerca del juego</h1>
      <div className="about-container">
        <div className="text-box" id="left">
          <ol>
            <li> Frente a ti se encuentra la isla de Temuco. Se compone de 19 hexágonos 
              de terreno, rodeados por el mar. Tu objetivo es colonizar la isla. </li>

            <li>En Temuco hay un desierto y cinco tipos diferentes de terreno:
              Cada uno de ellos produce una materia prima diferente. </li>

            <li>Empiezas la partida con 2 poblados y 2
              carreteras. Cada poblado vale 1 punto de victoria, así
              que ya empiezas con un total de 2 puntos de victoria. El
              primer jugador que consiga 10 puntos de victoria, gana la
              partida. </li>

            <li>Para conseguir más puntos de victoria tienes que construir
              nuevas carreteras y poblados, y ampliar tus poblados a ciudades.
              Una ciudad vale 2 puntos de victoria. Pero, para construir, necesitas
              materias primas. </li>

            <li>¿Cómo consigues las materias primas? Muy sencillo: en cada turno se
              determina el terreno que va a producir. Esto se hace tirando dos dados. En
              cada terreno hay una ficha numerada redonda. Si por ejemplo, la suma de
              los dados es un “3”, todos los terrenos marcados con un “3” producirán. En la
              ilustración de la derecha serían el bosque (que produciría madera) y el campo
              (que produciría trigo). </li>

            <li>Sólo consiguen materias primas los jugadores que tengan un poblado o una ciudad
              adyacentes a estos terrenos. En la ilustración el poblado azul está adyacente a
              un campo y los poblados blanco y rojo a un bosque. el resultado de la
              tirada es un "3", el jugador azul recibirá 1 trigo y los jugadores blanco y rojo
              recibirán 1 madera cada uno. </li>
          </ol>
        </div> 

        <div className="img-box">

          <div id="board">
            <img src={board} alt="board" id="board"/>
          </div>

          <h4>Las celdas producen diferentes recursos:</h4>  
          <div id="tiles">
            {cards.slice(0, 3).map(card=> (
              <Tile key={card.id} imgSrc={card.imgSrc} desc={card.desc}/>
            ))}
          </div>
          <div id="tiles">
            {cards.slice(3, 6).map(card=> (
              <Tile key={card.id} imgSrc={card.imgSrc} desc={card.desc}/>
            ))}
          </div>
          {/* <div id="tiles">
            <div className="tile">
              <img src={wood} alt="board" id="tile"/>
              <div>Los bosques producen madera</div>
            </div>
            <div className="tile">
              <img src={clay} alt="board" id="tile"/>
              <div>Los cerros producen arcilla</div>
            </div>
            <div className="tile">
              <img src={sheep} alt="board" id="tile"/>
              <div>Los pastos producen lana</div>
            </div>
          </div>

          <div id="tiles">
            <div className="tile">
              <img src={wheat} alt="board" id="tile"/>
              <div>Los campos producen trigo</div>
            </div>
            <div className="tile">
              <img src={mountain} alt="board" id="tile"/>
              <div>Las montañas producen rocas</div>
            </div>
            <div className="tile">
              <img src={desert} alt="board" id="tile"/>
              <div>El desierto no produce nada</div>
            </div>
          </div> */}
        </div> 

        <div className="text-box" id="right">
          <ol start="7">
            <li>Lo ideal es que la mayoría de los poblados estén adyacentes a varios
              terrenos (el máximo posible es 3). De esta forma, podrán conseguir, según
              el resultado de los dados, diferentes materias primas. En la ilustración, el
              poblado B está adyacente a 3 terrenos: bosque, montaña y cerro. </li>

            <li>No puedes tener poblados adyacentes a todos los terrenos y
              todas las fichas numeradas, así que algunas de las materias
              primas te serán imposibles o muy difíciles de conseguir. Pero,
              para construir nuevos edificios, necesitas diferentes combinaciones de materias primas. </li>

            <li>Por este motivo tienes que comerciar con el resto
              de jugadores. Haz una oferta o escucha las ofertas
              que te hagan y, si llegáis a un acuerdo, podrás
              conseguir la carta que te hace falta para construir un
              nuevo poblado. </li>

            <li>Puedes construir un poblado nuevo en una encrucijada
              que esté libre, con la condición de que una de tus propias
              carreteras lleve hasta ella y que el poblado más cercano esté,
              como mínimo, a dos encrucijadas de distancia. </li>

            <li>Pero has de pensar bien dónde construir los poblados. Los números
              de las fichas numeradas están impresos en tamaños diferentes.
              Esto indica que los números impresos más grandes salen con más
              frecuencia en los dados que los números impresos más
              pequeños. Los números 6 y 8 son los que están impresos
              más grandes y son de color rojo, para indicar que son
              los que salen con más frecuencia. En conclusión, cuantas
              más veces salga un número, más veces conseguirás materias
              primas del terreno que tenga ese número. </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default About
