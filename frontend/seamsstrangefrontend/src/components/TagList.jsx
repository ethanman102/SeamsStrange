import React from "react";
import "../styles/TagList.css";
import { useLocation,useNavigate } from "react-router-dom";
import instance from "../api";

const TagList = ({tags}) => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleTagEditClick = (event,id) => {
        event.stopPropagation();
        navigate('/admin/tags/',{state:{id:id}})
    }
    
    const tagListItems = tags.map((tag,i) => {
        return(<li key={tag.id} style={{backgroundColor: tag.color}} className="tagItem">
            {tag.name}
            <button className="tagEditButton" onClick={(event) => handleTagEditClick(event,tag.id)}>✏️</button>
        </li>);
    });

    return(
        <ul className="tagList">
            {tagListItems}
        </ul>
    );
}
export default TagList