import "../styles/ImageSlider.css";
import Paginator from "./Paginator";
import { useState,useEffect } from "react";
import View from "../constants";


const ImageSlider = ({images,mode,handleRemove}) => {

    const [page,setPage] = useState(images.length);
    
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
    }

    return(
        <>
            {mode === View.EDIT && <button className="removeImageButton" onClick={onDelete}>Remove Image 🗑️</button>}
            <img className="imageBox" index={page-1} src={images[page - 1]}/>
            <Paginator pageNumber={page} totalPages={images.length} update={handlePage}/>
        </>
    )
}

export default ImageSlider;