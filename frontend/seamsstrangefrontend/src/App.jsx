import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import ItemContainer from './components/ItemContainer';
import NavBar from './components/NavBar';
import Login from './components/Login';

function App() {

  return(
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/items/" element={<ItemContainer/>}/>
      </Routes>
    </>
  );
}

export default App
