import React from "react";
import "../styles/TagList.css";

const TagList = ({tags}) => {

    
    const tagListItems = tags.map((tag,i) => {
        return(<li key={i} style={{backgroundColor: tag.color}} className="tagItem">
            {tag.name}
        </li>);
    });

    return(
        <ul className="tagList">
            {tagListItems}
        </ul>
    );
}
export default TagList