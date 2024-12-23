import React from "react";
import "../styles/Paginator.css"


const Paginator = ({update,pageNumber,totalPages}) => {
    
    

    return(
        <div className="paginator">
            <button onClick={() => update(--pageNumber)} disabled={pageNumber === 1} className="paginatorButton">Previous</button>
            <p className="paginatorText">Page {pageNumber} of {totalPages}</p>
            <button onClick={() => update(++pageNumber)} disabled={pageNumber === totalPages} className="paginatorButton">Next</button>
        </div>
    );
}
export default Paginator