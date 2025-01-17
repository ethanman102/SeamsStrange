import "../styles/ImageSlider.css";
import Paginator from "./Paginator";
import { useState,useEffect } from "react";
import View from "../constants";


const ImageSlider = ({images,mode,handleRemove}) => {

    const [page,setPage] = useState(mode === View.EDIT ? images.length : 1);
    
    const handlePage = (newPage) => {
        setPage(newPage);
    }


    useEffect(() =>{
            if (mode === View.EDIT){
                setPage(images.length);
            }
        },[images]
    )


    const onDelete = () =>{
        handleRemove(page - 1);
        setPage(page ===1 ? 1 : page - 1);
    }

    return(
        <div className="imageSlider">
            {mode === View.EDIT && <button className="removeImageButton" onClick={onDelete}>Remove Image 🗑️</button>}
            <img className="imageBox" key={page-1} src={images[page - 1].url}/>
            <Paginator pageNumber={page} totalPages={images.length} update={handlePage} purpose={'Image'}/>
        </div>
    )
}

export default ImageSlider;