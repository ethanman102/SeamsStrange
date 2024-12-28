import React, {useEffect,useState} from "react";
import "../styles/TagFilter.css"
import axios from "axios";


const TagFilter = ({filterFunction}) => {

    const [tagChecks,setTagChecks] = useState([]);
    const [selected,setSelected] = useState([]);
    const [applied,setApplied] = useState(false);

    useEffect(() => {
        const getTags = async () =>{
            var response = await axios.get('http://localhost:8000/api/tags/');
            var fetchedTags = await response.data;
            return fetchedTags.tags;
        }

        getTags().then((fetchedTags) => {
             setTagChecks(fetchedTags.map((tag,i) =>{
                return(
                    <label key={tag.name} className="tagLabel" style={{backgroundColor: selected.includes(tag.name) ? "#0a7c5a" : ""}}>
                        <input type="checkbox" className="tagCheckbox" tag={tag.name} checked={selected.includes(tag.name)} onChange={(event) => handleCheck(event.target)}/>
                        <span className="check" style={{backgroundColor: tag.color}}></span>
                        {tag.name}
                    </label>
                );
            }));
        });
    },[selected]);   
    
    const handleCheck = (tagCheckbox) =>{
        var tagName = tagCheckbox.getAttribute("tag");
        if (selected.includes(tagName)){
            setSelected(selected.filter((tag)=> tag !== tagName));
        }else{
            setSelected([...selected,tagName]);
        }
    }

    const handleClearClick = () =>{
        setSelected([]);
        setApplied(false);
    }

    const handleApplyClick = () =>{
        setApplied(true);
    }

    return(
        <div className="tagFilter">
            <h3>Filter By Tag</h3>
            {tagChecks}
            {
                selected.length > 0 &&
                <div className="filterButtonContainer">
                    <button className="adjustTagFilterButton" onClick={handleApplyClick}>Apply</button>
                    {(applied && <button className="adjustTagFilterButton" onClick={handleClearClick}>Clear</button>)}
                </div>
            }
        </div>
    );
}
export default TagFilter