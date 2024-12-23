import React, { useState,useEffect } from "react";
import axios from "axios";
import ItemCard from "./ItemCard";
import "../styles/ItemContainer.css"
import Paginator from "./Paginator";

const ItemContainer = () => {

    const [page,setPage] = useState(1);
    const [items,setItems] = useState([]);
    const [totalPages,setTotalPages] = useState(null);
    const SIZE = 4;

    

    // re-render the items when the page query changes.
    useEffect(() => {
        const getItems = async () =>{
            var response = await axios.get('http://localhost:8000/api/items/',{params: {size: SIZE,page: page}});
            var fetchedItems = await response.data;
            setTotalPages(fetchedItems.total_pages)
            return fetchedItems.items;
        }

        getItems().then( (fetchedItems) =>{
            setItems(fetchedItems.map((item) =>{
                return <ItemCard title={item.title} price="8.99" tags={item.tags} key={item.id}/>
            } ));
            }
        );
       
        
    },[page]);
    


    return(
    <div className="itemBox">
        <div className="itemContainer">
            {items}
        </div>
        <Paginator update={setPage} pageNumber={page} totalPages={totalPages}/>
    </div>)
}
export default ItemContainer