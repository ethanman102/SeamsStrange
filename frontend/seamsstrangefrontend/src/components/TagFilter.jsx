import React, {useEffect,useState} from "react";
import "../styles/TagFilter.css"
import axios from "axios";


const TagFilter = ({filterFunction,purpose}) => {

    const [tagChecks,setTagChecks] = useState([]);
    const [selected,setSelected] = useState([]);
    const [applied,setApplied] = useState(false);

    useEffect(() => {
            axios.get('http://localhost:8000/api/tags/').then((response) => response.data).then((fetchedTags) => setTagChecks(fetchedTags.tags));
    },[]);   
    
    const handleCheck = (tagCheckbox) =>{
        var tagName = tagCheckbox.getAttribute("tag");
        var tagColor = tagCheckbox.getAttribute("color");
        var data = {
            name: tagName,
            color: tagColor
        };

        if (selected.some((tag) => 
            tag.name === tagName && tag.color === tagColor
        )){
            setSelected(selected.filter((tag)=> tag.name !== tagName));
        }else{
            setSelected([...selected,data]);
        }
    }

    const handleClearClick = () =>{
        setSelected([]);
        setApplied(false);
        filterFunction([]);
    }

    const handleApplyClick = () =>{
        setApplied(true);
        filterFunction(selected);
    }

    return(
        <div className="tagFilter">
            <h3>{purpose}<span className="tagWordTitle">Tag</span></h3>
            
            {
            tagChecks.map(tag=>{
                return(
                <label key={tag.name} className="tagLabel" style={{backgroundColor: selected.some((selectedTag) => tag.name === selectedTag.name) ? "#0a7c5a" : ""}}>
                    <input type="checkbox" className="tagCheckbox" tag={tag.name} checked={selected.some((selectedTag) => tag.name === selectedTag.name)} onChange={(event) => handleCheck(event.target)} color={tag.color}/>
                    <span className="check" style={{backgroundColor: tag.color}}></span>
                {tag.name}
                </label>
            )})
            }
            <div className="buttonSection">
                {selected.length > 0 && <button className="adjustTagFilterButton" onClick={handleApplyClick}>Apply</button>}
                {(applied && <button className="adjustTagFilterButton" onClick={handleClearClick}>Clear</button>)}
            </div>
                
            
        </div>
    );
}
export default TagFilter;


