import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import ItemCard from './components/ItemCard'

function App() {

 
  let itemProps = {
    title: "Dog Scarf",
    price: 6.99,
    tags: [
      {name: "Neck",
        color: "#413E9A"
      },
      {
        name: "Feet",
        color: "#266C0A"
      }
    ]
  };
  return(
    <>
      <Login/>
      <ItemCard item={itemProps}/>
    </>
  )
}

export default App
