import './Card.css'
import { useState } from 'react'
import CardButton from './CardButton'
import back from '../assets/tiles/BackTile.png';

export default function Tile({imgSrc, desc}){
  const [showImage, setShowImage] = useState(false);
  const toggleImage =() => {
    setShowImage(!showImage);
  }
  return(
    <div className="card">
      <CardButton onClick={toggleImage} showImage={showImage}/>
      <div className="card-container">
        {showImage && <img src={imgSrc} className="typetile" alt="avatar"/>}
        {showImage && <div>{desc}</div>}
        {!showImage && <img src={back} className="typetile" alt="avatar"/>}
      </div>
    </div>
  )
}