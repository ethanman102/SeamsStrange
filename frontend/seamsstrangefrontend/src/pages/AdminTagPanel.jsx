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

    const handleSubmit = () =>{
        console.log('submition time');
    }

    return(
    <>
        <div className="adminTagsHeader">
            <h1>Seams Strange</h1>
            <h2>Tags</h2>
        </div>
        <TagEditor tag={{}}/>
        <h1 className="currentHeader">Current</h1>
        <div className="adminPanelFrame">
            <TagList tags={tags}/>
        </div>
    </>
    );
}

export default AdminTagPanel;