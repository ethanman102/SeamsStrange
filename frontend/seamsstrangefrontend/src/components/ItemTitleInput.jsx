import { useState } from "react";
import "../styles/ItemTitleInput.css"

const ItemTitleInput = ({titleText,handleTitle}) =>{

    const MAXLENGTH = 100;

    const [count,setCount] = useState(titleText.length);

    const handleType = (title) =>{
        setCount(title.length);
        handleTitle(title);
    }

   return (
    <div>
        <label className="itemTitleLabel">Item Title</label>
        <input type="text" defaultValue={titleText} onChange={(event) => handleType(event.target.value)} maxLength={MAXLENGTH}/>
        <p>{count}/{MAXLENGTH}</p>
    </div>
    )
}
export default ItemTitleInput;