import { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './Game.css'
import {display} from './Tiles&Nodes';
import { AuthContext } from '../auth/AuthContext';
import Control from './Control';

function Game() {
  const navigate = useNavigate();
  const params = useParams();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const displayGame = async () => {
      try {
        await display(token, params.game_id);
        await Control(token, params.game_id, params.player_id);
      } catch (error) {
        navigate('/game'); 
        return;
      }
    };
    displayGame();
  }, []);


  return (
    <>
      <div className="center" id="main_panel">
          <svg id="board">
          </svg>
      </div>
    </>
  )
}

export default Game
