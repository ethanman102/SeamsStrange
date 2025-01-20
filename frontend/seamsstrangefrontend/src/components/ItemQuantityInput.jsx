import { useState,useEffect } from "react";
import "../styles/ItemQuantityInput.css"

const ItemQuantityInput = ({itemQuantity,handleQuantity}) => {
    const [quantity,setQuantity] = useState(itemQuantity || 0);

    useEffect(() => {
        setQuantity(itemQuantity || 0);
    },[itemQuantity]);

    const handleQuantityChange = (amount) =>{
        setQuantity(amount);
        handleQuantity(amount);
    }

    return(
        <div className="inputContainer">
            <label className="itemQuantityLabel">Quantity <span className="requiredTick">*</span></label>
            <input placeholder="0" onChange={(event) => handleQuantityChange(event.target.value)} value={quantity} type="number" step={1} min={0} className="quantityInput"/>
        </div>
    )
}
export default ItemQuantityInput;