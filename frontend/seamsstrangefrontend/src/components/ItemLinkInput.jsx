import { useState } from "react";
import "../styles/ItemLinkInput.css"

const ItemLinkInput = ({itemLink,handleLink}) => {
    const [link,setLink] = useState(itemLink);

    return(
        <div className="itemLinkInputContainer">
            <label className="itemLinkLabel">Link</label>
            <input type="url" defaultValue={itemLink}></input>
        </div>
    );
}
export default ItemLinkInput;