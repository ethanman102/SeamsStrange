import "../styles/AdminItemPanel.css"
import TagFilter from "../components/TagFilter";
import TagList from "../components/TagList";
import ItemTitleInput from "../components/ItemTitleInput";
import ItemDescriptionInput from "../components/ItemDescriptionInput";
import ItemPriceInput from "../components/ItemPriceInput";
import ItemLinkInput from "../components/ItemLinkInput";
import ItemQuantityInput from "../components/ItemQuantityInput";
import { useRef, useState,useContext,useEffect} from "react";
import instance from "../api";
import { useNavigate,useLocation } from "react-router-dom";
import { AuthContext } from "./Admin";
import ImageSlider from "../components/ImageSlider";
import ImageUploader from "../components/ImageUploader";
import View from "../constants";
import axios from "axios";

const AdminItemPanel = () => {

    const [title,setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price,setPrice] = useState(0.00);
    const [link,setLink] = useState("");
    const [quantity,setQuantity] = useState(0);
    const [allTags, setAllTags] = useState([]);
    const [currentTags, setCurrentTags] = useState([]);
    const [currentImages,setCurrentImages] = useState([]);

    const [viewMode,setViewMode] = useState(View.VIEW);

    const authenticationStateHandler = useContext(AuthContext);

    const {state} = useLocation();

    const navigate = useNavigate();

    // case when navigating to edit the item.
    useEffect(() =>{
        if (state && state.id){
            setTitle(state.title);
            setDescription(state.description);
            setPrice(state.price);
            setLink(state.etsyURL);
            setQuantity(state.quantity);
            setCurrentImages(state.images);
            setCurrentTags(state.tags);
            setViewMode(View.EDIT);
        }else{
            setTitle('');
            setDescription('');
            setPrice(0.00);
            setLink('');
            setQuantity(0);
            setCurrentImages([]);
            setCurrentTags([]);
            setViewMode([]);
        }
    },[state]);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/tags/').then((response) => response.data).then((fetchedTags) => setAllTags(fetchedTags.tags));
    },[]);

    const handleTitleChange = (titleText) =>{
        setTitle(titleText);
    }

    const handleDescriptionChange = (descriptionText) =>{
        setDescription(descriptionText);
    }

    const handlePriceChange = (itemPrice) =>{
        setPrice(itemPrice);
    }

    const handleLinkChange = (itemLink) =>{
        setLink(itemLink);
    }

    const handleQuantityChange = (itemQuantity) =>{
        setQuantity(itemQuantity);
    }

    const handleTagChange = (tagList) =>{
        setCurrentTags(tagList);
    }

    const onUpload = (imageFile) => {
        setCurrentImages([...currentImages,imageFile]);
    }

    const onDeleteImage = (index) => {
        setCurrentImages(currentImages.filter((_,i) => i !== index));
    }

    const onDisableEdit = () =>{
        setViewMode(View.VIEW);
        // reset the params id by simply calling on delete with a negative value
        navigate('/admin/items/');
    }
    
    const onReset = () => {
        setTitle(state.title);
        setDescription(state.description);
        setPrice(state.price);
        setLink(state.etsyURL);
        setQuantity(state.quantity);
        setCurrentImages(state.images);
        setCurrentTags(state.tags);
    }



    const createItem = () => {
        // Validate here to reduce round trip time.
        console.log('hi');
        var data = {}
        if (quantity < 0) return;
        console.log('boo')
        data.quantity = Number(quantity);
        console.log('oop')
        if (price < 0) return;
        console.log(price);
        data.price = parseFloat(price).toFixed(2); // this line gives error december 31 8pm
        if (!title) return;
        data.title = title;
        console.log('here');
        if (!description) return;
        data.description = description;
        if (!link) setLink("");
        data.etsy_url = link;
        data.tags = currentTags;
        data.images = []

        let formData = new FormData();
        currentImages.forEach(({ file }, index) => {
            formData.append('images', file);  // Append each file individually
        });

        // Create the axios request for the API call
        instance.post("/api/items/", data)
        .then((response) => {
            let id = response.data.id;
            formData.append('item', id);
            return instance.post('/api/images/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(() => id); // Return the id after images are uploaded
        })
        .then((id) => {
            navigate(`/items/${id}/`);
        })
        .catch((error) => {
            authenticationStateHandler(false);
            navigate('/admin');
        });

    }

    return(
        
    <div className="adminItemPanelFlexContainer">
        <div className="adminItemsHeader">
            <h1>Seams Strange</h1>
            <h2>Items</h2>
        </div>
        <h2 className="createItemHeader">{viewMode === View.VIEW ? "Create" : "Edit"} Item</h2>
        <p className="itemCreatePrompt">Follow the process below to {viewMode === View.VIEW ? "create" : "edit"} a new item for the shop!<br/>
        Please note that anything labelled with a is a required input for the item!<br/>
        <br/>
        IMPORTANT: If you want to create a new tag for the item during this process, do not switch tabs as your work will not be saved!<br/>
        You can always create the item then attach a tag afterwards in edit mode. </p>
        <div className="tagAndInputContainer">
            <div className="adminItemsTextualInputs">
                <h2 className="itemViewMode">Mode: {viewMode === View.VIEW ? "Create" : "Edit"}</h2>
                {
                    viewMode === View.EDIT ? <>
                    <button className="disableModeButton" onClick={() => onDisableEdit()}>Disable Edit Mode</button>
                    <p className="editButtonsPrompt">To reset the all changes you made you can utilize the reset button.<br/>To delete an item from the shop press the delete button.</p>  
                    <div className="editOptionButtons">
                        <button className="itemResetButton" onClick={onReset}>Reset</button>
                        <button className="itemDeleteButton">DELETE</button>
                    </div>
                        </>: ''
                }
                <ItemTitleInput titleText={title} handleTitle={handleTitleChange}/>

                <ItemDescriptionInput description={description} handleDescription={handleDescriptionChange}/>
                <div className="priceLinkAvailabilityContainer">
                    <ItemPriceInput itemPrice={price} handlePrice={handlePriceChange}/>
                    <ItemQuantityInput itemQuantity={quantity} handleQuantity={handleQuantityChange}/>
                </div>
                <h2 className="attachedTagsHeader">Attached Tags 🏷️</h2>
                <p className="itemCreationInputPrompt">
                These are the attached tags you have currently applied to the item.<br/>
                Note that if you click on the edit tag at the time all progress for creating the item will be lost!
                </p>
                <TagList tags={currentTags}/>
                <h2 className="imagesHeader">Images</h2>
                <p className="itemCreationInputPrompt">Choose files from your computer to upload for a specific item.<br/>
                To detach an image associated to the item click on the delete button at the top right corner.</p>
                {currentImages.length > 0 && <ImageSlider images={currentImages} mode={View.EDIT} handleRemove={onDeleteImage}/>}
                <ImageUploader handleUpload={onUpload}/>
                <ItemLinkInput itemLink={link} handleLink={handleLinkChange}/>
                <button className="createItemButton" onClick={createItem}>Save</button>
            </div>
            <TagFilter purpose="Attach a " filterFunction={handleTagChange} tags={allTags} currentSelection={currentTags}/>
        </div>
    </div>
    )
}
export default AdminItemPanel;