import { useEffect, useState } from "react";
import TagList from "../components/TagList"
import TagEditor from "../components/TagEditor";
import "../styles/AdminTagPanel.css"
import { useLocation } from "react-router-dom";
import instance from "../api";
import View from "../constants";


const AdminTagPanel = () => {

    const [tags,setTags] = useState([]);
    const [singleTag,setSingleTag] = useState({});
    const {state} = useLocation();

    


    useEffect(() =>{
        if (state && state.id){
           instance.get(`/api/tags/${state.id}/`).then((response) =>{
                let data = response.data;
                setSingleTag(data);
           }) 
        }else{
            setSingleTag({});
        }
    },[state])


    useEffect(() =>{
        instance.get('/api/tags/',

        ).then((response) => setTags(response.data.tags))
    },[])

    const handleDelete = (id) =>{
        setSingleTag({});
        let filteredTags = tags.filter((tag) => tag.id !== id);
        setTags(filteredTags);
    }

    const handleSubmit = (newTag,mode) =>{
        if (mode === View.EDIT){
        setTags(tags.filter((tag) => {
            if (newTag.id === tag.id){
                tag.name = newTag.name;
                tag.color = newTag.color;
                return true;
            }
            return true;
        }));
    }else if (mode === View.VIEW){
        setTags([...tags,newTag]);
        setSingleTag({});
    }}


    return(
    <div className="adminTagsPage">
        <div className="adminTagsHeader">
            <h1>Seams Strange</h1>
            <h2><span className="tagDecor">Tags</span></h2>
        </div>
        <div className="adminTagsContainer">
            <div className="createTagSection">
                <h1 className="createTagHeader">Tag Editor 🏷️</h1>  
                <TagEditor onSubmit={handleSubmit} onDelete={handleDelete} tag={singleTag}/>
            </div>
            <div className="currentTagsSection">
                <h2 id="currentHeader">Current Tags 🏷️</h2>
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