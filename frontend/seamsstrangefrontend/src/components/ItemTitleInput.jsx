import { useState } from "react";

const ItemTitleInput = ({titleText,handleTitle}) =>{

    const MAXLENGTH = 100;

    const [count,setCount] = useState(titleText.length);

    const handleType = (title) =>{
        setCount(title.length);
        handleTitle(title);
    }

   return (
    <>
        <input type="text" defaultValue={titleText} onChange={(event) => handleType(event.target.value)} maxLength={MAXLENGTH}/>
        <p>{count}/{MAXLENGTH}</p>
    </>
    )
}
export default ItemTitleInput;