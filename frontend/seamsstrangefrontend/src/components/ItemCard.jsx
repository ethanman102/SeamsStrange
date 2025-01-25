import React, { useState , useEffect} from "react";
import "../styles/ItemCard.css";
import TagList from "./TagList";
import { useNavigate } from "react-router-dom";
import ticker from "../ticker.js"

import noImage from "../assets/no-image-available8.jpg"

const ItemCard = ({title,price,tags,id,images,soldOut}) => {

    let navigate = useNavigate();
    const [image,setCurrentImage] = useState(images.length > 0 ? images[0] : noImage);
    const imagesLen = images.length;

    const handleNavigate = () =>{
        navigate(`/items/${id}/`);
        window.scrollTo({top:0,left:0,behavior:"smooth"});
    }

    useEffect(() => {

    })

    const onNextImage = (index) => {
        setCurrentImage(images[index % imagesLen]);
    }

    useEffect(() => {
        ticker.subscribe(onNextImage);

        return () => ticker.unsubscribe(onNextImage);
    },[])

    return(
    <div className="itemCard" onClick={handleNavigate}>
        <div className="itemCardHeader">
            <h1 className="itemTitle">{title}</h1>
            <p className="itemPrice"><span className="itemDollarSign">$</span>{price} {soldOut && <span className="soldOutPill">Sold Out</span>}</p>
        </div>
        <img className="cardItemImage" src={images && images.length > 0 ? image.url : noImage}/>
        <h4 className="tagListTitle">Tags 🏷️</h4>
        <TagList tags={tags}/>
    </div>)
}
export default ItemCard;