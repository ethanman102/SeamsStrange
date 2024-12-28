import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import ItemContainer from './components/ItemContainer';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Admin from './pages/Admin';

function App() {

  return(
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<h1>HEY</h1>}/>
        <Route path="/login/" element={<Login/>}/>
        <Route path="/items/" element={<ItemContainer/>}/>
        <Route path="/admin/" element={<Admin/>}/>
      </Routes>
    </>
  );
}

export default App
