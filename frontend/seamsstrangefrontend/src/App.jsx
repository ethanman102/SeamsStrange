import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import ItemContainer from './components/ItemContainer';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Admin from './pages/Admin';
import Homepage from './pages/Homepage';
import SingularItem from './pages/SingularItem';
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage';

function App() {

  return(
    <>
    <div className='pageContainer'>
      <div className='contentWrap'>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login/" element={<Login/>}/>
        <Route path="/items/" element={<ItemContainer/>}/>
        <Route path="/items/:id/" element={<SingularItem/>}/>
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path="/contact/" element={<ContactPage/>}/>
      </Routes>
      </div>
      <Footer/>
    </div>
    </>
  );
}

export default App
