import './Card.css'
import { useState } from 'react'
import CardButton from './CardButton'

export default function Card({cards}){
  const [showImage, setShowImage] = useState(false);
  const toggleImage =() => {
    setShowImage(!showImage);
  }
  return(
    <>
    <div className="card">
      <CardButton onClick={toggleImage} showImage={showImage}/>
    </div>
    <div className="card">
      <div className="card-container">
        <div id="tiles">
            {cards.slice(0, 3).map(card=> (
                <>{showImage && <img src={card.imgSrc} className="img"/>}</>
            ))}
        </div>
        <div id="tiles">
            {cards.slice(3, 5).map(card=> (
              <>{showImage && <img src={card.imgSrc} className="img"/>}</>
            ))}
        </div>
      </div>
    </div>
    </>
  )
}
