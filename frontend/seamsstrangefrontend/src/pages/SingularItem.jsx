import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SingularItem = () =>{

    let params = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price,setPrice] = useState(0.00);
    const [quantity,setQuantity] = useState(0);
    const [etsyURL,setEtsyURL] = useState('');
    const [tags,setTags] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/items/${params.id}`).then((response) => {
            var data = response.data;
            setTitle(data.title);
            setPrice(data.price);
            setDescription(data.description);
            setQuantity(data.quantity);
            setEtsyURL(data.etsy_url);
            setTags(data.tags);
        });
    },[]);

    return(
        <>
        <h1>{title}</h1>
        <h1>{price}</h1>
        </>
    )
}
export default SingularItem;