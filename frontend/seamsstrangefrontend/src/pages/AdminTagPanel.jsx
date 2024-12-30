import { useEffect, useState } from "react";
import TagList from "../components/TagList"
import TagEditor from "../components/TagEditor";
import axios from "axios";
import "../styles/AdminTagPanel.css"


const AdminTagPanel = () => {

    const [tags,setTags] = useState([]);


    useEffect(() =>{
        axios.get('http://localhost:8000/api/tags/',
            {withCredentials: true}
        ).then((response) => setTags(response.data.tags))
    },[])

    const handleSubmit = (newTag) =>{
        console.log("WELLL");
        setTags([...tags,newTag]);
    }

    return(
    <div className="adminTagsPage">
        <div className="adminTagsHeader">
            <h1>Seams Strange</h1>
            <h2>Tags </h2>
        </div>
        <div className="adminTagsContainer">
            <div className="createTagSection">
                <h1 className="createTagHeader">Create Tag 🏷️</h1>  
                <TagEditor onSubmit={handleSubmit} tag={{}}/>
            </div>
            <div className="currentTagsSection">
                <h1 className="currentHeader">Current Tags 🏷️</h1>
                <p className="currentTagsMessage">These are all of the current tags currently created for the website! <br/>
                to edit a tag click on the edit icon on the tag, from there you can change text, color, or delete the tag entirely!</p>
                <div className="adminPanelFrame">
                    <TagList className="adminTagList" tags={tags}/>
                </div>
            </div>
        </div>
    </div>
    );
}

export default AdminTagPanel;