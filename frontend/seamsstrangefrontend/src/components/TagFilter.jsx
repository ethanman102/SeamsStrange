import React, {useEffect,useState} from "react";
import "../styles/TagFilter.css"
import axios from "axios";


const TagFilter = () => {

    const [tagChecks,setTagChecks] = useState([]);

    useEffect(() => {
        const getTags = async () =>{
            var response = await axios.get('http://localhost:8000/api/tags/');
            var fetchedTags = await response.data;
            return fetchedTags.tags;
        }

        getTags().then((fetchedTags) => {
             setTagChecks(fetchedTags.map((tag,i) =>{
                return(
                    <label key={i} className="tagLabel">
                        <input type="checkbox" className="tagCheckbox"/>
                        <span className="check" style={{backgroundColor: tag.color}}></span>
                        {tag.name}
                    </label>
                );
            }));
        });
    },[]);   
    


    return(
        <div className="tagFilter">
            <h3>Filter By Tag</h3>
            {tagChecks}
        </div>
    );
}
export default TagFilter