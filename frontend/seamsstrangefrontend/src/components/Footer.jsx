import "../styles/Footer.css"
import { useNavigate } from "react-router-dom";
const Footer = () => {

    const navigate = useNavigate();
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
                <h5>Socials</h5>
            </div>
        </footer>
    );
}
export default Footer;