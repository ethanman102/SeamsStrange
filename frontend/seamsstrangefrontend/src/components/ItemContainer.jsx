import React, { useState,useEffect } from "react";
import axios from "axios";
import ItemCard from "./ItemCard";
import "../styles/ItemContainer.css"
import Paginator from "./Paginator";
import TagFilter from "./TagFilter";

const ItemContainer = () => {

    const SIZE = 9;

    const [page,setPage] = useState(1);
    const [items,setItems] = useState([]);
    const [totalPages,setTotalPages] = useState(null);
    const [filterTags,setFilterTags] = useState([]);

    const editFilteredTags = (tags) =>{
        setFilterTags(tags);
        setPage(1);
    }

    

    // re-render the items when the page query changes.
    useEffect(() => {
        const getItems = async () =>{
            var params = new URLSearchParams();
            params.append('size',SIZE);
            params.append('page',page);
            for (var tag of filterTags){
                params.append('tag',tag);
            }
            var response = await axios.get('http://localhost:8000/api/items/',{params:params});
            var fetchedItems = await response.data;
            setTotalPages(fetchedItems.total_pages === 0 ? 1 : fetchedItems.total_pages)
            return fetchedItems.items;
        }

        getItems().then( (fetchedItems) =>{
            setItems(fetchedItems.map((item) =>{
                return <ItemCard title={item.title} price="8.99" tags={item.tags} key={item.id}/>
            } ));
            }
        );
       
        
    },[page,filterTags]);
    


    return(
    <>
    <div className="itemShopHeader">
        <h1>Shop</h1>
        <h2>Embroidary</h2>
    </div>
    <div className="itemPageContainer">
    <TagFilter filterFunction={editFilteredTags} purpose="Filter By "/>
    <div className="itemBox">
        <div className="itemContainer">
            {items}
        </div>
        <Paginator update={setPage} pageNumber={page} totalPages={totalPages}/>
    </div>
    </div>
    </>)
}
export default ItemContainer;