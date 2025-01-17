import "../styles/AdminItemPanel.css"
import TagFilter from "../components/TagFilter";
import TagList from "../components/TagList";
import ItemTitleInput from "../components/ItemTitleInput";
import ItemDescriptionInput from "../components/ItemDescriptionInput";
import ItemPriceInput from "../components/ItemPriceInput";
import ItemLinkInput from "../components/ItemLinkInput";
import ItemQuantityInput from "../components/ItemQuantityInput";
import {useState,useContext,useEffect} from "react";
import instance from "../api";
import { useNavigate,useLocation } from "react-router-dom";
import { AuthContext } from "./Admin";
import {ThreeDot} from 'react-loading-indicators';
import ImageSlider from "../components/ImageSlider";
import ImageUploader from "../components/ImageUploader";
import View from "../constants";
import axios from "axios";
import asModal from "../components/wrappers/asModal";
import DeletePrompt from "../components/DeletePrompt";

const AdminItemPanel = () => {

    const [title,setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price,setPrice] = useState(0.00);
    const [link,setLink] = useState("");
    const [quantity,setQuantity] = useState(0);
    const [allTags, setAllTags] = useState([]);
    const [currentTags, setCurrentTags] = useState([]);
    const [currentImages,setCurrentImages] = useState([]);
    const [loading,setLoading] = useState(false);

    const [viewMode,setViewMode] = useState(View.VIEW);

    const [openModal,setOpenModal] = useState(0);

    const authenticationStateHandler = useContext(AuthContext);

    const {state} = useLocation();

    const navigate = useNavigate();

    const ModalDelete = asModal(DeletePrompt);
    const ModalLoader = asModal(ThreeDot);

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
            setViewMode(View.VIEW);
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
        setOpenModal(0);
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

    const onDeleteItem = () => {
        setOpenModal(0);
        setLoading(true);
        instance.delete(`http://localhost:8000/api/items/${state.id}/`).then(() => {
            navigate('/items/');
        }).catch((error)=>{
            setLoading(false);
            return;
        })
    }



    const createItem = () => {
        // Validate here to reduce round trip time.
        var data = {}
        if (quantity < 0) return;
        data.quantity = Number(quantity);
        if (price < 0) return;
        data.price = parseFloat(price).toFixed(2); // this line gives error december 31 8pm
        if (!title) return;
        data.title = title;
        if (!description) return;
        data.description = description;
        if (!link) setLink("");
        data.etsy_url = link;
        data.tags = currentTags;

        setLoading(true);

        let formData = new FormData();
        let alreadyUploadedImages = []
        if (viewMode === View.VIEW){
            currentImages.forEach(({ file }, index) => {
                formData.append('images', file);  // Append each file individually
            });
        }else{
            // case where we have both new images and files.
            for(let img of currentImages){
                if (img.file){
                    formData.append('images',img.file);
                }else{
                    // get the list of already added urls.
                    alreadyUploadedImages.push(img.url); 
                }
            }
        }

        // Create the axios request for the API call
        if (viewMode === View.VIEW){
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
                setLoading(false);
                authenticationStateHandler(false);
                navigate('/admin');
            });
        }else{
            let imagesToDelete = state.images.filter((img) => !alreadyUploadedImages.includes(img.url));
            instance.put(`/api/items/${state.id}/`, data)
            .then((response) => {
                // upload
                formData.append('item', state.id);
                return instance.post('/api/images/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }); // Return the id after images are uploaded
            }).then(() => {
                let deletePromises = [];
                for (let img of imagesToDelete){
                    deletePromises.push(instance.delete(`/api/images/${img.id}/`));
                }
                return Promise.all(deletePromises);
            })
            .then(() => {
                navigate(`/items/${state.id}/`);
            })
            .catch((error) => {
                setLoading(false);
                authenticationStateHandler(false);
                navigate('/admin');
            });

        }

    }

    return(
    <>
    {loading && <ModalLoader color="#ffffff" size="medium" closeable={false}/>}
    {openModal !== 0 && <ModalDelete deleteObject="Item" deleteCallback={onDeleteItem} modalSwitch={setOpenModal} closeable={true} className="loader"/>}  
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
                        <button className="itemDeleteButton" onClick={() => setOpenModal(openModal + 1)}>DELETE</button>
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
    </> 
    )
}
export default AdminItemPanel;