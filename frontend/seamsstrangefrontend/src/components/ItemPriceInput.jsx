import { useState,useEffect } from "react";
import "../styles/ItemPriceInput.css"

const ItemPriceInput = ({itemPrice,handlePrice}) =>{


    const [price,setPrice] = useState(itemPrice || 0.00);

    useEffect(() => {
        setPrice(itemPrice || 0.00);
    },[itemPrice])

    const handlePriceChange = (decimal) =>{
        setPrice(decimal);
        handlePrice(decimal);
    }

    return(
        <div className="inputContainer">
            <label className="itemPriceLabel">Price</label>
            $<input placeholder="0.00" value={price} onChange={(event) => handlePriceChange(event.target.value)}  type="number" step={0.01} min={0} className="priceInput"/>
        </div>
    )
}
export default ItemPriceInput;