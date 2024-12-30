import { useState } from "react";
import "../styles/TagEditor.css"
import axios from "axios";
import Cookies from "js-cookie"

const TagEditor = ({onSubmit,tag}) =>{

    const [tagColor,setTagColor] = useState(tag.color);
    const [tagText,setTagText] = useState(tag.name);

    const onColorChange = (color) =>{
        setTagColor(color);
    }

    const onTextChange = (text) =>{
        setTagText(text);
    }

    const onConfirm = () =>{
        var csrfToken = Cookies.get('csrftoken');
        var data = {
            name: tagText,
            color: tagColor
        }
        axios.post("http://localhost:8000/api/tags/",
            data,
            {
            headers:{
                'X-CSRFToken' : csrfToken
            },
            withCredentials:true
            }
        ).then((response) =>{
            if (response.status === 201 || response.status === 200){ 
                onSubmit(data);
            }
        }).catch((error) => console.error("Request Failed"));
    }

    return(

    <>
    <p className="tagEditorDisclaimer">Ensure that tags names are concise and as descriptive as possible.<br/> Customers should be prompted with the main idea of the item that the tag is associated with through it's name.<br/>
    Stay away from colours that will hide the tag's text, or the outline of the tag itself!
    </p>
    <div className="tagEditorFlexContainer">
        <div className="tagCreationInput">
            <label className="nameLabel">Name</label>
            <input type="text" defaultValue={tagText} onChange={(event) =>{onTextChange(event.target.value)}} className="tagNameInput"></input>
            <label className="colorLabel">Color</label>
            <input type="color" onChange={(event) => {onColorChange(event.target.value)}} maxLength="30" className="tagColorInput"/>
        </div>
        <div className="tagCreationOutput">
            <h3 className="currentTagDesignHeader">Current Design</h3>
            <span className="tagPill" style={{backgroundColor: tagColor}}>{tagText}</span>
            <div className="tagEditorButtons">
                <button className="tagEditorButton" onClick={() => onConfirm()}>Create</button>
                <button className="tagEditorButton">Reset</button>
            </div>
        </div>
    </div>
    </>
    );
}
export default TagEditor;