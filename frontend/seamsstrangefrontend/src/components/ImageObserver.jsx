import { useState,useEffect } from "react";
import ticker from "../ticker";
import "../styles/ImageObserver.css"

const ImageObserver = ({images}) => {
    const imagesLen = images.length
    const [image,setImage] = useState(images[0].url);

    const onNextImage = (index) => {
        setImage(images[index % imagesLen].url);
    }

    useEffect(() => {
        ticker.subscribe(onNextImage);

        return () => ticker.unsubscribe(onNextImage);
    },[])

    return(
        <img className="imageObserver" key={image} src={image}/>
    );
}

export default ImageObserver;