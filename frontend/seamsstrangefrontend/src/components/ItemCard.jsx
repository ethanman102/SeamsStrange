import React, { useState } from "react";
import axios from "axios";
import "../styles/ItemCard.css";
import TagList from "./TagList";

const ItemCard = (props) => {

 
    let title = props.item.title;
    let price = props.item.price;
    


    return(
    <div className="itemCard">
        <h1 className="itemTitle">{title}</h1>
        <p className="price">${price}</p>
        <TagList tags={props.item.tags}/>
    </div>)
}
export default ItemCard