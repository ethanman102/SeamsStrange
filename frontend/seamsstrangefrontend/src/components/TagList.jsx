import React from "react";
import "../styles/TagList.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {v4 as uuidv4} from 'uuid';
import { AppAuthenticated } from "../App";

const TagList = ({tags}) => {

    
    const appAuth = useContext(AppAuthenticated);
    const navigate = useNavigate();

    const handleTagEditClick = (event,id) => {
        event.stopPropagation();
        navigate('/admin/tags/',{state:{id:id}})
    }

    
    const tagListItems = tags.map((tag,i) => {
        return(<li key={uuidv4()} style={{backgroundColor: tag.color}} className="tagItem">
            {tag.name}
            {appAuth && <button className="tagEditButton" onClick={(event) => handleTagEditClick(event,tag.id)}>✏️</button>}
        </li>);
    });

    return(
        <ul className="tagList">
            {tagListItems.length > 0 ? tagListItems : <h4>No Tags</h4>} 
        </ul>
    );
}
export default TagList