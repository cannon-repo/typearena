import React from 'react';
import "../Styles/TypeArena.css";
import NavBar from './NavBar';
import SpeedTest from './SpeedTest';
import GuessTheWord from './GuessTheWord';
import FastestFingers from './FastestFingers';
import {Route, Routes, Navigate} from "react-router-dom";
import {useWindowSize} from "../Hooks/ResizeHook";

const TypeArena = () => {

  const [, height] = useWindowSize();

  return (
    <div className='TypeArena'>
      <NavBar/>
      <div className='Screens' style={{height: height - 60 + 'px'}}>
        <Routes>
          <Route path="/" element={<Navigate to="/speedtest"/>}/>
          <Route path="/speedtest" element={<SpeedTest/>}/>
          <Route path="/guesstheword" element={<GuessTheWord/>}/>
          <Route path="/fastestfingers" element={<FastestFingers/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default TypeArena;