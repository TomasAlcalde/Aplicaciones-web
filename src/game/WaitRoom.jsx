import { useEffect, useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Game.css'
import {display} from './Tiles&Nodes';
import { AuthContext } from '../auth/AuthContext';
import Control from './Control';

    
async function handleEnterGame(token, navigate, game_id, player_id) {
    navigate(`/game/${game_id}/${player_id}`)
    /* await display(token, game_id);
    Control(token, game_id); */
}

export default function WaitRoom() {
    const [players, setPlayers] = useState([]);
    const { token } = useContext(AuthContext)
    const navigate = useNavigate(); // Inicializa el hook useHistory

    useEffect(() => {
        const fetchGames = async () => {
          try {
            const user_id = JSON.parse(localStorage.getItem("user_id")).id
            const response = await axios({
              method: 'get',
              url: `https://aplicaciones-web.onrender.com/users/${user_id}`,
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }) 
            setPlayers(response.data.players);
          } catch (error) {
            navigate('/login'); // Reemplaza '/login' con la ruta de tu formulario de inicio de sesión
            return;
          }
        };
        fetchGames();
      }, []);

      const createGame = async () => {
        try {
          const user_id = JSON.parse(localStorage.getItem("user_id")).id
          const token = localStorage.getItem('token');
          await axios.post(
            'https://aplicaciones-web.onrender.com/players',
            { user_id: user_id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
    
          // Recarga la página después de crear el juego
          window.location.reload();
        } catch (error) {
          // Manejo de errores
        }
      };

    return (
        <div className="center">
          <div className="Login">
            <h1>Partidas del Usuario</h1>
            <button onClick={createGame}>Crear nuevo juego</button>
            <ul className="game-list">
                {players.map((player) => (
                <li key={player.id} className="game-list-item">
                    {player.id}
                    <button onClick={() => handleEnterGame(token, navigate, player.game_id, player.id)}>Ingresar</button>
                </li>
                ))}
            </ul>
          </div>
        </div>
    )
}
