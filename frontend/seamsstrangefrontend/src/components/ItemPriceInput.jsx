import { useState } from "react";
import "../styles/ItemPriceInput.css"

const ItemPriceInput = ({itemPrice,handlePrice}) =>{

    const [price,setPrice] = useState(itemPrice);

    const handlePriceChange = (decimal) =>{
        setPrice(decimal);
        handlePrice(decimal);
    }

    return(
        <div className="itemPriceInputContainer">
            <label className="itemPriceLabel">Price</label>
            $<input placeholder="0.00" onChange={(event) => handlePriceChange(event.target.value)} defaultValue={itemPrice} type="number" step={0.01} min={0} className="priceInput"/>
        </div>
    )
}
export default ItemPriceInput;