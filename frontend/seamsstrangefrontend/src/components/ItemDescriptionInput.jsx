import { useState,useEffect } from "react";
import "../styles/ItemDescriptionInput.css"

const ItemDescriptionInput = ({description,handleDescription}) =>{
    const MAXLENGTH = 1000;
    const [count,setCount] = useState(description.length);
    const [text,setText] = useState(description);

    useEffect(()=>{
       setText(description);
       setCount(description.length); 
    },[description]);


    const handleChange = (text) =>{
        setCount(text.length);
        setText(text);
        handleDescription(text);
    }

    return(
        <div>
            <label className="itemDescriptionLabel">Item Description</label>
            <textarea className="descriptionInput" value={text} placeholder="Item Description"  rows={15} onChange={(event) => handleChange(event.target.value)} maxLength={1000}></textarea>
            <p>{count}/{MAXLENGTH}</p>
        </div>
    )
}
export default ItemDescriptionInput;
