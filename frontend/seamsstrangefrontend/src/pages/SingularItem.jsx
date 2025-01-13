import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TagList from "../components/TagList";
import ItemCard from "../components/ItemCard";
import ContactForm from "../components/ContactForm";
import "../styles/SingularItem.css"
import asModal from "../components/wrappers/asModal"
import ImageSlider from "../components/ImageSlider";
import View from "../constants";

const SingularItem = () =>{

    let params = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price,setPrice] = useState(0.00);
    const [quantity,setQuantity] = useState(0);
    const [etsyURL,setEtsyURL] = useState('');
    const [tags,setTags] = useState([]);
    const [openModal,setOpenModal] = useState(0);
    const [recommendations,setRecommendations] = useState([]);
    const [images,setImages] = useState([]);

    const ModalContact = asModal(ContactForm);

    useEffect(() => {
        setOpenModal(0);
        axios.get(`http://localhost:8000/api/items/${params.id}`).then((response) => {
            var data = response.data;
            setTitle(data.title);
            setPrice(data.price);
            setDescription(data.description);
            setQuantity(data.quantity);
            setEtsyURL(data.etsy_url);
            setTags(data.tags);
            setImages(data.images);
        });
        axios.get(`http://localhost:8000/api/items/${params.id}/recommendations/`).then((response) => {
            var data = response.data;
            setRecommendations(data.items);
        })
    },[params.id]);

    return(
        <>
        {openModal && <ModalContact page={title} openModal={openModal} />}
        <div className="singleItemContainer">
            <div className="singleItemContent">
                <h1 className="singleItemTitle">{title}</h1>
                <h2 className="singleItemPrice">${price}</h2>
                <h3 className="singleItemQuantity">Available: {quantity}</h3>
                {images.length > 0 && <ImageSlider mode={View.VIEW} images={images}/>}
            </div>
            <div className="informationContainer">
            <div className="descriptionContainer">
                <h1>About the Product</h1>
                <label className="singleDescriptionLabel">Description</label>
                <p className="singleItemDescription">{description}</p>

                {etsyURL && <>
                <label className="singleURLLabel">URL</label>
                <a className="singleItemURL" href={etsyURL}>{title}'s URL</a>
                </>}

                <h2 className="singleItemTags">Tags 🏷️</h2>
                <TagList tags={tags}/>
                </div>
                <div className="contactSellerContainer">
                    <h2 className="contactSellerTitle">Interested In Buying?</h2>
                    <button className="contactSellerButton" onClick={() => setOpenModal(openModal + 1)}>Contact Us Here!</button>
                </div>

                </div>
        </div>
            <h2 className="newestCreations">You May Also Like</h2>
            <div className="recommendationsContainer">
                {recommendations.map((item) =>{
                    return <ItemCard title={item.title} price={item.price} tags={item.tags} key={item.id} id={item.id} images={item.images}/>
                })}
            </div>
        </>
    )
}
export default SingularItem;