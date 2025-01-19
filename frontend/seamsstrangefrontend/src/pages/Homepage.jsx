import logo from "../assets/logo.png"
import "../styles/Homepage.css"
import image1 from "../assets/image2.jpg"
import image2 from "../assets/image1.jpg"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ImageObserver from "../components/ImageObserver"
import ItemCard from "../components/ItemCard"
import axios from "axios"


const Homepage = () =>{
    const navigate = useNavigate();
     const [recommendations,setRecommendations] = useState([]);

     useEffect(() => {

        axios.get(`http://localhost:8000/api/items/99999/recommendations/`).then((response) => {
            var data = response.data;
            setRecommendations(data.items);
        })
    },[]);

    return (
    <div className="homepage">
    <div className="overlayContent">
    <div className="homepageContents">
    <img className="logo" src={logo}/>
    <h1 className="homepageTitle">
        Seams <span className="titleStrange">Strange</span> Embroidery
    </h1>
    <h2 className="homepageSnag">The place for all your custom embroidery</h2>
    <button className="homepageShop" onClick={()=>navigate('/items')}>Shop Now</button>
    </div>
    </div>
    
    <ImageObserver images={[{url:image1},{url:image2}]}/>
    <div className="left">
    <div>
    <h2 className="aboutHeader">Who we are</h2>
    <p className="aboutParagraph">We are a family run embroidery business located in Leduc, Alberta.<br/>
    We specialize in emobroidery by creating custom designs for our customers whether they are individuals or entire companies.<br/>
    All designs are drafted by Debbie Keys and Ron Keys while working with the customer to adjust design choices based on their likes and dislikes
    </p>
    </div>
    </div>
    <div className="right">
    <div>
    <h2 className="operateHeader">How we operate</h2>
    <p className="operateParagraph">We work directly with our customers who bring us their inspiring new ideas.<br/>From there, we take your idea and turn it into an embroidary design, gathering your input during the process <br/>
    Not only do you get to choose the design, you also get to decide on where and what it will be embroidered onto, such as a hat, shirt, pants, you name it! </p>
    </div>
    </div>
    <div className="left">
    <h2 className="ownPieceHeader">Get your own piece</h2>
    <p className="ownPieceParagraph">If you're looking to get your own piece of embroidery, feel free to contact us <br/> You can directly call us or send us an email, where phone calls are more likely for a quick response<br/>
    Visit our contact section to get started!</p>
    </div>
    {recommendations.length >0 &&<><div className="newestItemsContainer">
    <h2 className="newest">Newest Creations</h2>
    <div className="recommendationsContainer">
                {recommendations.map((item) =>{
                    return <ItemCard title={item.title} price={item.price} tags={item.tags} key={item.id} id={item.id} images={item.images}/>
                })}
    </div>
    </div></>}
    </div>);
}
export default Homepage;