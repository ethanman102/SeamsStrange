import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TagList from "../components/TagList";
import ContactForm from "../components/ContactForm";
import "../styles/SingularItem.css"

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
        <div className="singleItemContainer">
            <h1 className="singleItemTitle">{title}</h1>
            <h2 className="singleItemPrice">${price}</h2>
            <p className="singleItemDescription">{description}</p>
            <h2 className="singleItemTags">Tags 🏷️</h2>
            <TagList tags={tags}/>
            <h2 className="newestCreations">Newest creations you may like</h2>
            <ContactForm/>
        </div>
    )
}
export default SingularItem;