import React from "react";
import "../styles/TagList.css";
import { useLocation,useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import instance from "../api";
import {v4 as uuidv4} from 'uuid';

const TagList = ({tags}) => {

    const [authenticated,setAuthenticated] = useState(null);
    

    const location = useLocation();
    const navigate = useNavigate();

    const handleTagEditClick = (event,id) => {
        event.stopPropagation();
        navigate('/admin/tags/',{state:{id:id}})
    }

    useEffect(() =>{
        instance.get('http://localhost:8000/api/authenticated/').then((response) =>{
            if (response.status === 200) setAuthenticated(true);
            else setAuthenticated(false);
        }).catch((error)=> {setAuthenticated(false);}
    );

    },[]);
    
    const tagListItems = tags.map((tag,i) => {
        return(<li key={uuidv4()} style={{backgroundColor: tag.color}} className="tagItem">
            {tag.name}
            {authenticated && <button className="tagEditButton" onClick={(event) => handleTagEditClick(event,tag.id)}>✏️</button>}
        </li>);
    });

    return(
        <ul className="tagList">
            {tagListItems.length > 0 ? tagListItems : <h4>No Tags</h4>} 
        </ul>
    );
}
export default TagList