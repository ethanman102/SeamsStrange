import React, { useState,useEffect } from "react";
import axios from "axios";
import ItemCard from "../components/ItemCard";
import "../styles/ItemContainer.css"
import Paginator from "../components/Paginator";
import TagFilter from "../components/TagFilter";
import { apiUrl } from "../constants";

const ItemContainer = () => {

    const SIZE = 8;

    const [page,setPage] = useState(1);
    const [items,setItems] = useState([]);
    const [totalPages,setTotalPages] = useState(null);
    const [filterTags,setFilterTags] = useState([]);
    const [authenticated,setAuthenticated] = useState(false);

    const editFilteredTags = (tags) =>{
        setFilterTags(tags);
        setPage(1);
    }

    

    const handlePage = (pageNum) => {
        setPage(pageNum);
    }

    // use effect to repoint person at top of page whenever paginator at bottom is activated or new tags are activated
    useEffect(() => {
        window.scrollTo({top:0,left:0,behavior:"smooth"});
    },[filterTags,page]);


    // re-render the items when the page query changes.
    useEffect(() => {
        const getItems = async () =>{
            var params = new URLSearchParams();
            params.append('size',SIZE);
            params.append('page',page);
            for (var tag of filterTags){
                params.append('tag',tag.name);
            }
            var response = await axios.get(`${apiUrl}/api/items/`,{params:params});
            var fetchedItems = await response.data;
            setTotalPages(fetchedItems.total_pages === 0 ? 1 : fetchedItems.total_pages)
            return fetchedItems.items;
        }

        getItems().then( (fetchedItems) =>{
            setItems(fetchedItems.map((item) =>{
                return <ItemCard title={item.title} price={item.price} tags={item.tags} key={item.id} id={item.id} images={item.images} soldOut={item.sold_out}/>
            } ));
            }
        );
       
        
    },[page,filterTags]);
    


    return(
    <>
    <div className="itemShopHeader">
        <h1>Shop</h1>
        <h2>Embroidery</h2>
    </div>
    <div className="itemPageContainer">
    <TagFilter filterFunction={editFilteredTags} purpose="Filter By " currentSelection={filterTags}/>
        <div className="itemBox">
            <div className="itemContainer">
                {items.length > 0 ? items : <h2 className="noResultsHeader">No Results</h2>}
            </div>
            <Paginator update={handlePage} pageNumber={page} totalPages={totalPages} purpose={'Page'}/>
        </div>
    </div>
    </>)
}
export default ItemContainer;