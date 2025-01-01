import "../styles/AdminItemPanel.css"
import TagFilter from "../components/TagFilter";
import TagList from "../components/TagList";
import ItemTitleInput from "../components/ItemTitleInput";
import ItemDescriptionInput from "../components/ItemDescriptionInput";
import ItemPriceInput from "../components/ItemPriceInput";
import ItemLinkInput from "../components/ItemLinkInput";
import ItemQuantityInput from "../components/ItemQuantityInput";
import { useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"

const AdminItemPanel = () => {

    const titleRef = useRef('myTitle');
    const descriptionRef = useRef('myDescription');
    const priceRef = useRef(0.00);
    const linkRef = useRef("http://localhost:8000/");
    const quantityRef = useRef(0);
    const [currentTags, setCurrentTags] = useState([]);

    const handleTitleChange = (titleText) =>{
        titleRef.current = titleText;
    }

    const handleDescriptionChange = (descriptionText) =>{
        descriptionRef.current = descriptionText;
    }

    const handlePriceChange = (itemPrice) =>{
        priceRef.current = itemPrice;
    }

    const handleLinkChange = (itemLink) =>{
        linkRef.current = itemLink;
    }

    const handleQuantityChange = (itemQuantity) =>{
        quantityRef.current = itemQuantity;
    }

    const handleTagChange = (tagList) =>{
        setCurrentTags(tagList);
    }

    
    const createItem = () => {
        // Validate here to reduce round trip time.
        var data = {}
        if (quantityRef.current < 0) return;
        data.quantity = Number(quantityRef.current);
        if (priceRef.current < 0) return;
        data.price = parseFloat(priceRef.current.toFixed(2)); // this line gives error december 31 8pm
        if (!titleRef.current) return;
        data.title = titleRef.current;
        if (!descriptionRef.current) return;
        data.description = descriptionRef.current;
        if (!linkRef) linkRef.current = "";
        data.etsy_url = linkRef.current;
        data.tags = currentTags;
        
        // Create the axios request for the API call
        axios.post("http://localhost:8000/api/items/",
            data,
            {
                headers:{
                    "X-CSRFToken": Cookies.get('csrftoken')
                },
                withCredentials: true
            }
        ).then(console.log("ITEM POSTED")).catch(console.log('ERROR BISH'));

    }

    return(
        
    <div className="adminItemPanelFlexContainer">
        <div className="adminItemsHeader">
            <h1>Seams Strange</h1>
            <h2>Items</h2>
        </div>
        <h2 className="createItemHeader">Create Item</h2>
        <p className="itemCreatePrompt">Follow the process below to create a new item for the shop!<br/>
        Please note that anything labelled with a is a required input for the item!<br/>
        <br/>
        IMPORTANT: If you want to create a new tag for the item during this process, do not switch tabs as your work will not be saved!<br/>
        You can always create the item then attach a tag afterwards in edit mode. </p>
        <div className="tagAndInputContainer">
            <div className="adminItemsTextualInputs">
                <ItemTitleInput titleText={titleRef.current} handleTitle={handleTitleChange}/>
                <ItemDescriptionInput description={descriptionRef.current} handleDescription={handleDescriptionChange}/>
                <div className="priceLinkAvailabilityContainer">
                    <ItemPriceInput itemPrice={priceRef.current} handlePrice={handlePriceChange}/>
                    <ItemQuantityInput itemQuantity={quantityRef.current} handleQuantity={handleQuantityChange}/>
                </div>
                <h3>Attached Tags 🏷️</h3>
                <TagList tags={currentTags}/>
                <ItemLinkInput itemLink={linkRef.current} handleLink={handleLinkChange}/>
                <button onClick={createItem}>Create</button>
            </div>
            <TagFilter purpose="Attach a " filterFunction={handleTagChange}/>
        </div>
    </div>
    )
}
export default AdminItemPanel;