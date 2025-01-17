import { useState,useEffect } from "react";
import "../styles/ItemLinkInput.css"

const ItemLinkInput = ({itemLink,handleLink}) => {
    const [link,setLink] = useState(itemLink);

    useEffect(()=>{
        setLink(itemLink);
    },[itemLink]);

    const handleType = (text) =>{
        setLink(text);
        handleLink(text);
    }

    return(
        <div className="itemLinkInputContainer">
            <label className="itemLinkLabel">Link</label>
            <p className="linkInputPrompt">Provide a URL for the item such as an Instagram post, an etsy page, etc.</p>
            <input type="url" onChange={(event) => handleType(event.target.value)}  value={link}></input>
        </div>
    );
}
export default ItemLinkInput;