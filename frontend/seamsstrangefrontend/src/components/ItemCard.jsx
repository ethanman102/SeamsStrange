import React, { useState } from "react";
import "../styles/ItemCard.css";
import TagList from "./TagList";
import { useNavigate } from "react-router-dom";
import seamImage from "../assets/seamsstrangelogindesign.jpg"

const ItemCard = ({title,price,tags,id}) => {

    let navigate = useNavigate();

    const handleNavigate = () =>{
        navigate(`/items/${id}/`);
        window.scrollTo({top:0,left:0,behavior:"smooth"});
    }

    return(
    <div className="itemCard" onClick={handleNavigate}>
        <div className="itemCardHeader">
            <h1 className="itemTitle">{title}</h1>
            <p className="itemPrice"><span className="itemDollarSign">$</span>{price}</p>
        </div>
        <img className="cardItemImage" src='https://seams-strange-bucket.s3.us-east-2.amazonaws.com/seamsstrangelogindesign.jpgd6b75b63-f6b9-48f2-bd9e-311b9f226a75'/>
        <h4 className="tagListTitle">Tags 🏷️</h4>
        <TagList tags={tags}/>
    </div>)
}
export default ItemCard;