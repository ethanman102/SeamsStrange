import { useState, useEffect } from "react";
import "../styles/ItemTitleInput.css";

const ItemTitleInput = ({ titleText, handleTitle }) => {
    const MAXLENGTH = 100;

    const [title, setTitle] = useState(titleText || "");
    const [count, setCount] = useState(titleText.length || 0);

    useEffect(() => {
        setTitle(titleText || "");
        setCount(titleText.length || 0);
    }, [titleText]);

    const handleType = (title) => {
        setTitle(title);
        setCount(title.length);
        handleTitle(title);
    };

    return (
        <div className="inputContainer">
            <label className="itemTitleLabel">Item Title <span className="requiredTick">*</span></label>
            <input type="text" value={title} placeholder="Item Title"  onChange={(event) => handleType(event.target.value)} maxLength={MAXLENGTH}/>
            <p>{count}/{MAXLENGTH}</p>
        </div>
    );
};

export default ItemTitleInput;