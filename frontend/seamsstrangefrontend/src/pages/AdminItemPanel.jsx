import "../styles/AdminItemPanel.css"
import TagFilter from "../components/TagFilter";
import ItemTitleInput from "../components/ItemTitleInput";
import ItemDescriptionInput from "../components/ItemDescriptionInput";
import ItemPriceInput from "../components/ItemPriceInput";
import ItemLinkInput from "../components/ItemLinkInput";
import ItemQuantityInput from "../components/ItemQuantityInput";
import { useRef } from "react";
const AdminItemPanel = () => {

    const titleRef = useRef('myTitle');
    const descriptionRef = useRef('myDescription');
    const priceRef = useRef(0.00);
    const linkRef = useRef("http://localhost:8000/");
    const quantityRef = useRef(0);

    const handleTitleChange = (titleText) =>{
        titleRef.current = titleText;
    }

    const handleDescriptionChange = (descriptionText) =>{
        descriptionRef.current = descriptionText;
    }

    const handlePriceChange = (itemPrice) =>{
        descriptionRef.current = itemPrice;
    }

    const handleLinkChange = (itemLink) =>{
        linkRef.current = itemLink;
    }

    const handleQuantityChange = (itemQuantity) =>{
        quantityRef.current = itemQuantity;
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
                <ItemLinkInput itemLink={linkRef.current} handleLink={handleLinkChange}/>
            </div>
            <TagFilter purpose="Attach a "/>
        </div>
    </div>
    )
}
export default AdminItemPanel;