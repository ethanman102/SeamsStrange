import "../styles/AdminItemPanel.css"
import TagFilter from "../components/TagFilter";
import ItemTitleInput from "../components/ItemTitleInput";
import { useRef } from "react";
const AdminItemPanel = () => {

    const titleRef = useRef('myTitle');

    const handleTitleChange = (titleText) =>{
        titleRef.current = titleText;
        console.log(titleRef.current)
    }

    return(
        
    <>
        <div className="adminItemsHeader">
            <h1>Seams Strange</h1>
            <h2>Items</h2>
            <TagFilter purpose="Attach a "/>
            <ItemTitleInput titleText={titleRef.current} handleTitle={handleTitleChange}/>
        </div>
        <h2>Create Item</h2>
        <p>Follow the process below to create a new item for the shop!<br/>
        Please note that anything labelled with a is a required input for the item!<br/>
        <br/>
        IMPORTANT: If you want to create a new tag for the item during this process, do not switch tabs as your work will not be saved!<br/>
        You can always create the item then attach a tag afterwards in edit mode. </p>
    </>
    )
}
export default AdminItemPanel;