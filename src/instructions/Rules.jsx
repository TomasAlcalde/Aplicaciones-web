import { useState } from 'react'
import './About.css'
import Card from '../game/Card'
import wood from '../assets/cards/Wood2.png'
import clay from '../assets/cards/Clay2.png'
import sheep from '../assets/cards/Sheep2.png'
import wheat from '../assets/cards/Wheat2.png'
import rock from '../assets/cards/Rock2.png'
import knight from '../assets/cards/Knight.jpg'
import road from '../assets/cards/Road.jpg'
import plenty from '../assets/cards/Plenty.jpg'
import monopoly from '../assets/cards/Monopoly.jpg'
import victory from '../assets/cards/Victory.jpg'

function Rules() {

  const resource_cards = [
    { id: 1, imgSrc: wood},
    { id: 2, imgSrc: clay},
    { id: 3, imgSrc: sheep},
    { id: 4, imgSrc: wheat},
    { id: 5, imgSrc: rock}
  ]
  const progress_cards = [
    { id: 1, imgSrc: knight},
    { id: 2, imgSrc: road},
    { id: 3, imgSrc: plenty},
    { id: 4, imgSrc: monopoly},
    { id: 5, imgSrc: victory}
  ]

  return (
    <div className="instructions-container">
      <h1 className="page-heading">Reglas</h1>
      <div className="rules-container">
        <div className="text-boxes">
          <div className="text-box">
            <h3 className="page-heading">Preparativos</h3>
            <p>Cada jugador recibe una tabla de costes de construcción y todas las
              figuras de un color: 5 poblados , 4 ciudades  y 15 carreteras. 
              Cada jugador coloca 2 carreteras y 2 poblados en el tablero
              según indica la ilustración.</p>
            <p>Las cartas de materia prima se separan en 5 pilas según tipo y se
              colocan boca arriba en los compartimentos de los portacartas. Las cartas 
              de desarrollo  se mezclan y se colocan boca abajo en el compartimento 
              libre que ha quedado en un portacartas.</p>
            <p>Por último, cada jugador recibe por su último poblado ubicado sus 
              primeras cartas de materia prima: por cada hexágono de terreno que 
              limite con ese poblado el jugador toma una carta de la materia prima 
              correspondiente de la pila.</p>
          </div>

          <div className="text-box">
            <h3 className="page-heading">Resumen de juego</h3>
            <p>El turno de un jugador se divide en las fases siguientes, que debe resolver en el orden
            indicado:</p>
            <ol>
              <li>Tirar los dados para determinar la producción de materias primas
                del turno (el resultado se aplica a todos los jugadores).</li>
              <li>Puede comerciar: intercambiar materias primas, con el banco
                o con el resto de jugadores. </li>
              <li>Puede construir: carreteras, poblados, ciudades
                y comprar cartas de desarrollo. </li>
            </ol>
            <p>Además, en cualquier momento de su turno (también antes de tirar
              los dados) puede jugar una de sus cartas de desarrollo . Después,
              el turno pasa al siguiente jugador, que empieza
              de nuevo desde la fase 1.</p>
          </div>
              
          <div className="text-box">
            <h3 className="page-heading">Desarrollo del juego</h3>
            
            <h4>1. Producción de materias primas </h4>
            <p>El jugador empieza su turno tirando los dos dados: la suma de los
              resultados indica los terrenos que van a producir materias primas. </p>
            <p>Cada jugador que tenga un poblado adyacente a un terreno en el
              que haya una ficha numerada con el resultado de los dados, obtiene
              por ese poblado una carta de materia prima del tipo producido por
              el terreno. Si un jugador tiene 2 ó 3 poblados adyacentes a un
              mismo terreno cuyo número haya salido en los dados, obtiene por
              cada poblado una carta de materia prima. Si un jugador tiene una
              ciudad adyacente a un terreno que haya salido en los dados, recibe
              por esa ciudad 2 cartas de materia prima. </p>
            
            <h4>2. Comerciar </h4>
            <p>Ahora, el jugador puede comerciar para conseguir las cartas de
              materia prima que necesite. Hay dos tipos de comercio: </p>
            <ul>
              <li>Comercio interior (comercio con los otros jugadores) :<br/>
                El jugador puede intercambiar cartas de materia prima con todos
                los jugadores. Puede anunciar las materias primas que necesita y
                las que está dispuesto a dar a cambio. También puede escuchar
                las ofertas del resto de jugadores y ofrecer a cambio alguna de las
                cartas de materia prima que tenga.<br/>
                Importante: los otros jugadores sólo pueden comerciar con el
                jugador que tiene el turno. Los otros jugadores no pueden
                comerciar entre ellos. </li>
              <li>Comercio exterior (comercio con el banco) : <br/>
                El jugador también puede intercambiar sin necesidad de hacerlo
                con ningún otro jugador.
                <ul>
                  <li>Siempre puede intercambiar con el indio pícaro en razón 4:1, 
                    devolviendo 4 cartas iguales de materia prima a la pila correspondiente 
                    y tomando a cambio una carta de materia prima a su elección. </li>
                  <li>Si ha construido un poblado en un puerto  puede intercambiar
                    de forma más favorable: en un puerto 3:1 se cambian tres cartas
                    iguales de materia prima por una carta de materia prima a su
                    elección, y en un puerto especial se cambian 2 cartas de la materia
                    prima que indique el puerto por una carta de materia prima a su
                    elección. </li>
                </ul>
              </li>
            </ul>

            <h4>3. Construir </h4>
            <p>Por último, el jugador puede construir para aumentar sus
              posibilidades de obtener materias primas y sus puntos de victoria.</p>
            <ul><li>Para construir, el jugador tiene que pagar de su mano una
              combinación concreta de cartas de materia prima (ver la tabla de
              costes de construcción), tomar de su reserva las carreteras,
              poblados o ciudades correspondientes y colocarlos en el tablero
              de juego. Las cartas de materia prima empleadas se devuelven a
              sus pilas correspondientes.</li></ul>
            <ol type="a">
              <li>Carretera: se necesita arcilla + madera
                <ul>
                  <li>Las carreteras se construyen sobre los caminos. En cada camino
                    sólo se puede construir 1 carretera.</li>
                  <li>Una carretera sólo se puede colocar adyacente a un vértice
                    que sea, a su vez, adyacente a una carretera propia, un poblado
                    propio o una ciudad propia, y en la que no haya un poblado o
                    ciudad de otro jugador.</li>
                  <li>En cuanto un jugador consiga tener una ruta
                    consecutiva (las bifurcaciones no cuentan) de
                    como mínimo cinco carreteras independientes
                    que no esté interrumpida por un poblado o una
                    ciudad de otro jugador, consigue la tarjeta
                    especial “Mayor carretera austral”. Si algún
                    otro jugador consigue construir una ruta más
                    larga que la del propietario actual de la carta
                    especial, consigue entonces, de forma inmediata,
                    dicha tarjeta. Tener la Mayor ruta comercial
                    vale por 2 puntos de victoria.</li>
                </ul>
              </li>
              
              <li>Poblado: se necesita arcilla + madera + lana + trigo
                <ul>
                  <li>El poblado se debe construir en un vértice al que, como
                    mínimo, llegue una carretera propia. Se debe tener en cuenta la
                    regla de la distancia.</li>
                  <li>Regla de la distancia: sólo se puede construir un poblado en
                    un vértice cuando los tres vértices adyacentes NO
                    estén ocupadas por poblados o ciudades, sin que importe a qué
                    jugador pertenezcan.</li>
                  <li>Por cada poblado construido, el jugador podrá obtener materias
                    primas de los terrenos adyacentes: cada vez que salga el número del
                    terreno en los dados obtendrá 1 carta de materia prima.</li>
                  <li>Cada poblado vale 1 punto de victoria.</li>
                </ul>
              </li>
              
              <li>Ciudad: se necesita 3 minerales + 2 cereales <br/>
                  ¡Sólo se puede construir una nueva ciudad ampliando un poblado ya
                    construido!
                <ul>
                  <li> Si el jugador amplía uno de sus poblados a ciudad, se retira el poblado
                    del tablero, lo devuelve a su reserva y lo sustituye por una ciudad.</li>
                  <li> Por cada ciudad construida, el jugador podrá obtener el doble de
                    materias primas de los terrenos adyacentes: cada vez que salga el
                    número del terreno en los dados obtendrá 2 cartas de materia
                    prima.</li>
                  <li> Cada ciudad vale 2 puntos de victoria.</li>
                </ul>
              </li>

              <li>Comprar una carta de desarrollo : se necesita mineral + lana + trigo
                <ul>
                  <li> Cuando un jugador compra una carta de desarrollo, toma la carta
                    superior de la pila de cartas de desarrollo</li>
                  <li>Hay cuatro tipos de cartas de desarrollo, y cada uno tiene un efecto diferente:
                    destrozos, fuerzas especiales, progreso y punto de victoria.</li>
                  <li>Las cartas de desarrollo que se compran se mantienen en 
                    secreto hasta su uso.</li>
                </ul>
              </li>
            </ol>

            <h4>4. Casos especiales </h4>
            <ol type="a">
              <li>Con un “7” se activa el indio pícaro
                <ul>
                  <li>Si en la tirada de producción el jugador obtiene un “7”,
                    entonces ningún jugador recibe materias primas ese turno.</li>
                  <li>Todos los jugadores eligen la mitad de sus cartas de materia prima 
                    y las devuelven a las pilas correspondientes. Si un jugador tiene una 
                    cantidad impar de cartas, se redondea a su favor, es decir, hacia abajo 
                    (por ejemplo, si tiene 9 cartas debe devolver 4).</li>
                  <li>A continuación, el jugador debe mover el indio:
                    <ol>
                      <li>El jugador debe mover el indio a otro hexágono de terreno</li>
                      <li>Después puede robar una carta de materia prima a un jugador
                        que tenga un poblado o ciudad adyacente a ese terreno. Si hay 
                        más de un jugador que tenga poblados o ciudades adyacentes al terreno, 
                        el indio pícaro puede elegir a qué jugador desea robarle la carta.</li>
                      <li>A continuación, el jugador continúa su turno con la fase de
                        comercio.</li>
                    </ol>  
                  </li>
                </ul>
                <p>Importante: Si al tirar los dados sale el número del terreno sobre el
                  que se encuentra el indio pícaro, los propietarios de poblados y ciudades
                  adyacentes NO reciben NINGUNA carta de materia prima.</p>
              </li>
              <li>Con un “2” o "12" se activa el ataque pícaro
                <ul>
                  <li>Si en la tirada de producción el jugador obtiene un “2” o "12",
                    entonces ningún jugador recibe materias primas ese turno.</li>
                  <li>El jugador que lanzó puede robar una carta de materia prima a 
                    cada jugador de la partida.</li>
                  <li>El indio pícaro vuelve al desierto. A continuación, el jugador 
                    continúa su turno con la fase de comercio.</li>
                </ul>
              </li>
              <li> Jugar una carta de desarrollo<br/>
                El jugador puede jugar una carta de desarrollo en cualquier
                momento de su turno, incluso antes de tirar los dados. NO puede
                jugar una carta de desarrollo en el mismo turno en que la haya
                comprado.
                <ol>
                  <li>Cartas de destrozos
                    <ul>
                      <li>Las cartas de destrozos tienen como función afectar el 
                        desarrollo de otros jugadores. Existen dos tipos:
                        <ol>
                          <li>Toma de carreteras: está carta tiene como función quitarle permanentemente
                            una carretera a otro jugador. Para poder usarla, el jugador debe poseer una 
                            carretera propia adyacente a la que desea robar. Posteriormente, puede extender 
                            sus rutas desde la nueva carretera.</li>
                          <li>Quema de poblados/ciudades: el jugador que juega esta carta puede 
                            elegir a otro jugador para que uno de sus poblados sea destrozado. 
                            Esta acción dura 2 turnos, por lo que durante el periodo el jugador 
                            afectado pierde momentaneamente los puntos de victoria correspondientes 
                            y no recibe recursos por la construcción.</li>
                        </ol>
                      </li>
                    </ul>
                  </li>
                  <li>Cartas de fuerzas especiales
                    <ul>
                      <li>El jugador que juegue una carta de fuerzas especiales mueve
                        el indio pícaro.</li>
                      <li>Las cartas de caballero, una vez jugadas, se mantienen
                        boca arriba sobre la mesa delante de su propietario.</li>
                      <li>El primer jugador que consiga tener tres cartas de caballero a la
                        vista delante de él, obtiene la tarjeta “Mayor ejército”, que vale
                        por 2 puntos de victoria</li>
                      <li>Si algún otro jugador consigue tener a la vista
                        más cartas de caballero que el propietario actual
                        de la tarjeta especial “Mayor ejército”, consigue
                        entonces, de forma inmediata, la tarjeta especial
                        y con ello los 2 puntos de victoria.</li>
                    </ul>
                  </li>
                  <li>Cartas de progreso
                    <ul>
                      <li>Cuando un jugador juega una carta de
                        progreso, lleva a cabo la acción indicada por
                        el texto de la carta. A continuación, la carta
                        se retira del juego, devolviéndola a la caja.</li>
                    </ul>
                  </li>
                  <li>Cartas de puntos de victoria
                    <ul>
                      <li>Las cartas de puntos de victoria
                        se mantienen en secreto durante
                        toda la partida. Sólo se descubren
                        cuando, gracias a ellas, el jugador
                        consigue tener un total de 10
                        puntos de victoria.
                        </li>
                    </ul>
                  </li>
                </ol>
              </li>
            </ol>
          </div>

          <div className="text-box">
            <h3 className="page-heading">Fin del juego</h3>
            <p>La partida acaba en el turno en que un jugador consiga 10
              puntos de victoria o más. Para ganar, el jugador tiene que tener
              10 puntos de victoria o más cuando llegue su turno, o
              conseguir llegar durante su turno a 10 puntos de victoria o
              más.</p>
          </div>
        </div>
        <div className="img-box" id="rules-img">
          <p>Cartas de recursos:</p>
          <Card cards={resource_cards}/>
          <p>Cartas de progreso:</p>
          <Card cards={progress_cards}/>
        </div>
      </div>
    </div>
  )
}

export default Rules
