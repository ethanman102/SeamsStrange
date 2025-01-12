import { useState,useContext,useEffect } from "react";
import "../styles/TagEditor.css"
import { AuthContext } from "../pages/Admin";
import { useNavigate } from "react-router-dom";
import instance from "../api";
import View from "../constants";


const TagEditor = ({onSubmit,onDelete,tag}) =>{
    console.log(tag);
    const [tagColor,setTagColor] = useState(tag.color ? tag.color : "#000000" );
    const [tagText,setTagText] = useState(tag.name);
    const [message,setMessage] = useState('');
    const [viewMode,setViewMode] = useState(View.VIEW);

    const authenticationStateHandler = useContext(AuthContext);

    useEffect(() => {
        if (tag) {
          setTagColor(tag.color || "#000000");
          setTagText(tag.name || "");
        }
        if (tag.name){
            setViewMode(View.EDIT);
        }else{
            setViewMode(View.VIEW);
        }
      }, [tag]);

    const navigate =  useNavigate();

    const onColorChange = (color) =>{
        setTagColor(color);
    }

    const onTextChange = (text) =>{
        setTagText(text);
    }

    const onReset = () =>{
        setTagText(tag.name ? tag.name : "");
        setTagColor(tag.color ? tag.color : "#000000");
        setMessage('');
    }

    const onRemove = (id) => {

        instance.delete(`/api/tags/${id}/`).then((response) => {
            onDelete(id);
            setMessage("Item Delete");
        }).catch((error) =>{
            if (error.response.status === 401){
                navigate('/admin');
            }
        })
    }

    const onConfirm = () =>{

        if (tagText === undefined || tagText === ''){
            setMessage("Tag name can not be blank.");
            return
        }

        var data = {
            name: tagText,
            color: tagColor
        }
        instance.post("/api/tags/",
            data,
        ).then((response) =>{
            if (response.status === 201 || response.status === 200){ 
                onSubmit(data);
                setTagText(tag.name ? tag.name : "");
                setTagColor(tag.color ? tag.color : "#000000");
                setMessage('Tag Created');
            }
        }).catch((error) => {
            if (error.response.status === 401){
                authenticationStateHandler(false);
                navigate('/admin');
            }else if (error.response.status === 500){
                setMessage('Invalid Tag name. Is this name already being used?')
            }
        });
    }

    return(

    <>
    <h2 className="tagEditorMode">Mode: {viewMode === View.VIEW ? "Create" : "Edit"}</h2>
    <p className="tagEditorDisclaimer">Ensure that tags names are concise and as descriptive as possible.<br/> Customers should be prompted with the main idea of the item that the tag is associated with through it's name.<br/>
    Stay away from colours that will hide the tag's text, or the outline of the tag itself!
    </p>
    <div className="tagEditorFlexContainer">
        <div className="tagCreationInput">
            <label className="nameLabel">Name</label>
            <input type="text" value={tagText} defaultValue={tagText} onChange={(event) =>{onTextChange(event.target.value)}} className="tagNameInput"/>
            <label className="colorLabel">Color</label>
            <input type="color" value={tagColor} defaultValue={tag.color ? tag.color : "#000000"} onChange={(event) => {onColorChange(event.target.value)}} maxLength="30" className="tagColorInput"/>
        </div>
        <div className="tagCreationOutput">
            <h3 className="currentTagDesignHeader">Current Design</h3>
            <span className="tagPill" style={{backgroundColor: tagColor}}>{tagText}</span>
            <div className="tagEditorButtons">
                <button className="tagEditorButton" onClick={() => onConfirm()}>{viewMode === View.VIEW ? "Create" : "Update"}</button>
                <button className="tagEditorButton" onClick={() => onReset()}>Reset</button>
                {viewMode === View.EDIT && <button className="tagEditorButton" onClick={() => onRemove(tag.id)}>Delete</button>}
            </div>
            <p className="tagEditorMessage">{message}</p>
        </div>
    </div>
    </>
    );
}
export default TagEditor;