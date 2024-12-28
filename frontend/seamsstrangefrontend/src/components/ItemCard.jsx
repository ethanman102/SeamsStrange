import React, { useState } from "react";
import "../styles/ItemCard.css";
import TagList from "./TagList";

const ItemCard = ({title,price,tags}) => {

    return(
    <div className="itemCard">
        <h1 className="itemTitle">{title}</h1>
        <p className="itemPrice"><span className="itemDollarSign">$</span>{price}</p>
        <h4 className="tagListTitle">Tags</h4>
        <TagList tags={tags}/>
    </div>)
}
export default ItemCard;