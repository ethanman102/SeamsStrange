import "../styles/AdminSocialPanel.CSS"
import { useState } from "react";

const AdminSocialPanel = () => {

    const [loading,setLoading] = useState(false);

    return(
        <div className="socialPage">
        <div className="adminSocialHeaders">
            <h1>Seams Strange</h1>
            <h2>Socials</h2>
        </div>
        <p className="adminSocialPrompt">Add the links to your Instagram, Etsy, and Facebook for your customers<br/>
            Please note that if you wish to not have a social icon apopear at the sites footer, either delete the url from the textbox or leave it blank<br/>
            </p>
        <div className="adminSocialPanelFlexContainer">
            <div className="socialInputContainer">
                <h2 className="socialInputHeader">CurrentSocials</h2>
                <form action="">
                    <label className="instagramLabel">Instagram</label>
                    <input className="instagramInput" type="url" name="name" placeholder="Instagram Link" disabled={loading}/>
                    <label className="etsyLabel">Etsy</label>
                    <input className="etsyInput" type="url" name="email" placeholder="Etsy Link" disabled={loading}/>
                    <label className="facebookLabel">Facebook</label>
                    <input className="facebookInput" type="url" name="email" placeholder="Facebook Link" disabled={loading}/>
                    <button className="socialSubmit" type="submit" disabled={loading}>Submit</button>
                </form>
            </div>
        </div>
        </div>
    )
}
export default AdminSocialPanel;