import "../styles/Footer.css"
import { useNavigate } from "react-router-dom";
import { CiInstagram,CiFacebook } from "react-icons/ci";
import { SiEtsy } from "react-icons/si";
import { useState,useEffect } from "react";
import instance from "../api";

const Footer = () => {

    const [facebook,setFaceBook] = useState('');
    const [instagram,setInstagram] = useState('');
    const [etsy,setEtsy] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        instance.get("/api/socials/all/").then((response)=>{
            let data = response.data;
            setFaceBook(data.FACEBOOK);
            setInstagram(data.INSTAGRAM);
            setEtsy(data.ETSY);
        }).catch((error) => {
            console.log(error);
        })
    },[]);


    const handleContactClick = () =>{
        navigate('/contact');
        window.scrollTo({top:0,left:0,behavior:"smooth"});
    }
    const handleLearnMoreClick = () =>{
        navigate('/');
        window.scrollTo({top:0,left:0,behavior:"smooth"});
    }

    return(
        <footer className="footer">
            <div className="bottom">
                <div className="footerBottomText">
                    <h2 className="customPieceHeader">Want a Custom Piece?</h2>
                    <p className="checkmarkText">✓ Creative</p>
                    <p className="checkmarkText">✓ Precise</p>
                    <p className="checkmarkText">✓ Quality</p>
                </div>
                <div className="footerButtonDiv">
                    <button className="learnMoreButton" onClick={handleLearnMoreClick}>Learn More →</button>
                    <button className="contactButton" onClick={handleContactClick}>Contact →</button>
                </div>
            </div>
            <div className="socialsDiv">
                <p className="socialsHeader">Our Socials</p>
                {(instagram && instagram !== '') && <CiInstagram className="socialIcon" onClick={() => window.location.href=instagram}/>}
                {(facebook && facebook !== '') &&<CiFacebook className="socialIcon"  onClick={() => window.location.href=facebook}/>}
                {(etsy && etsy !== '') && <SiEtsy className="socialIcon"  onClick={() => window.location.href=etsy}/>}
            </div>
        </footer>
    );
}
export default Footer;