import { useState, useEffect } from "react";
import "../styles/ItemTitleInput.css";

const ItemTitleInput = ({ titleText, handleTitle }) => {
    const MAXLENGTH = 100;

    const [title, setTitle] = useState(titleText);
    const [count, setCount] = useState(titleText.length);

    useEffect(() => {
        setTitle(titleText);
        setCount(titleText.length);
    }, [titleText]);

    const handleType = (title) => {
        setTitle(title);
        setCount(title.length);
        handleTitle(title);
    };

    return (
        <div>
            <label className="itemTitleLabel">Item Title</label>
            <input type="text" value={title} placeholder="Item Title"  onChange={(event) => handleType(event.target.value)} maxLength={MAXLENGTH}/>
            <p>{count}/{MAXLENGTH}</p>
        </div>
    );
};

export default ItemTitleInput;