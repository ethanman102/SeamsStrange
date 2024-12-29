import { useState } from "react";
import "../styles/TagEditor.css"

const TagEditor = ({onSubmit,tag}) =>{

    const [tagColor,setTagColor] = useState(tag.color);
    const [tagText,setTagText] = useState(tag.name);

    const onColorChange = (color) =>{
        setTagColor(color);
    }

    const onTextChange = (text) =>{
        setTagText(text);
    }

    return(

        
    <>
        <div className="tagCreationInput">
            <input type="text" defaultValue={tagText} onChange={(event) =>{onTextChange(event.target.value)}} className="tagColorInput"></input>
            <input type="color" onChange={(event) => {onColorChange(event.target.value)}} maxLength="30" className="tagNameInput"/>
        </div>
        <div className="tagCreationOutput">
            <span className="tagPill" style={{backgroundColor: tagColor}}>{tagText}</span>
        </div>
    </>
    );
}
export default TagEditor;