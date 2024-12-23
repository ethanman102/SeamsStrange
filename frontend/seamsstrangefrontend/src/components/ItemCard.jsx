import React, { useState } from "react";
import "../styles/ItemCard.css";
import TagList from "./TagList";

const ItemCard = ({title,price,tags}) => {

    return(
    <div className="itemCard">
        <h1 className="itemTitle">{title}</h1>
        <p className="itemrice">${price}</p>
        <TagList tags={tags}/>
    </div>)
}
export default ItemCard