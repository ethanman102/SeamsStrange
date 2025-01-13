import "../styles/ImageSlider.css";
import Paginator from "./Paginator";
import { useState,useEffect } from "react";
import View from "../constants";


const ImageSlider = ({images,mode}) => {

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

    return(
        <>
            <h1>Images</h1>
            <img className="imageBox" src={images[page - 1]}/>
            <Paginator pageNumber={page} totalPages={images.length} update={handlePage}/>
        </>
    )
}

export default ImageSlider;