import { useState,useEffect } from "react";
import "../styles/ItemAvailabilityInput.css"

const ItemAvailabilityInput = ({itemAvailability,handleAvailbility}) => {
    
        const [availability,setAvailability] = useState(itemAvailability || false);
    
        useEffect(() => {
            setAvailability(itemAvailability || false);
        },[itemAvailability])
    
        const handleAvailabilityChange = (boolVal) =>{
            console.log(boolVal)
            setAvailability(boolVal);
            handleAvailbility(boolVal);
        }
    
        return(
            <div className="inputContainer">
                <label className="itemAvailabilityLabel">Sold Out</label>
                <input checked={availability}  onChange={(event) => handleAvailabilityChange(event.target.checked)}  type="checkbox" className="availabilityInput"/>
            </div>
        )
}
export default ItemAvailabilityInput;