import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './App'
import About from '../instructions/About'
import Rules from '../instructions/Rules'
import Game from '../game/Game'
import Team from '../instructions/Team'
import Login from '../profile/Login'
import Signup from '../profile/Signup'
import WaitRoom from '../game/WaitRoom'
import PageError from './PageError'


export default function Routing() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<App/>} />
                <Route path={'/about'} element={<About/>}/>
                <Route path={'/rules'} element={<Rules/>}/>
                <Route path={'/game/:game_id/:player_id'} element={<Game/>}/>
                <Route path={'/game'} element={<WaitRoom/>}/>
                <Route path={'/team'} element={<Team/>}/>
                <Route path={"/login"} element={<Login />}/>
                <Route path={"/signup"} element={<Signup />}/>
                <Route path="*" element={<PageError />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}