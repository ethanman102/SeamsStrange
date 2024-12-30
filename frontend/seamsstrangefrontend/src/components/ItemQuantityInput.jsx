import { useState } from "react";
import "../styles/ItemQuantityInput.css"

const ItemQuantityInput = ({itemQuantity,handleQuantity}) => {
    const [quantity,setQuantity] = useState(itemQuantity);

    const handleQuantityChange = (amount) =>{
        setQuantity(amount);
        handleQuantity(amount);
    }

    return(
        <div className="itemQuantityInputContainer">
            <label className="itemQuantityLabel">Quantity</label>
            <input placeholder="0" onChange={(event) => handleQuantityChange(event.target.value)} defaultValue={itemQuantity} type="number" step={1} min={0} className="quantityInput"/>
        </div>
    )
}
export default ItemQuantityInput;