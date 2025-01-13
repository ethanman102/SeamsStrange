import "../styles/Footer.css"
const Footer = () => {
    return(
        <footer className="footer">
            <div className="bottom">
                <div className="footerBottomText">
                    <h2 className="customPieceHeader">Want a Custom Piece?</h2>
                    <p className="checkmarkText">✓ Creative</p>
                    <p className="checkmarkText">✓ Precision</p>
                    <p className="checkmarkText">✓ Quality</p>
                </div>
                <div className="footerButtonDiv">
                    <button className="learnMoreButton">Learn More →</button>
                    <button className="contactButton">Contact →</button>
                </div>
            </div>
            <div className="socialsDiv">
                <h5>Socials</h5>
            </div>
        </footer>
    );
}
export default Footer;