import "../styles/AdminSocialPanel.CSS"
import { useState,useEffect } from "react";
import instance from "../api";
import asModal from "../components/wrappers/asModal";
import { ThreeDot } from "react-loading-indicators";

const AdminSocialPanel = () => {

    const [loading,setLoading] = useState(false);
    const [facebook,setFaceBook] = useState(null);
    const [etsy,setEtsy] = useState(null);
    const [instagram,setInstagram] = useState(null);

    const ModalLoader = asModal(ThreeDot);

    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);
        let formData = new FormData(event.target);
        let object = Object.fromEntries(formData);
        let json = JSON.stringify(object);
        let response = await instance.post('/api/socials/',
            json,
            {
                headers:{
                    "Content-Type": "application/json"
                }
            }
        );
        if (response.status === 200){
            setLoading(false);
        }
        else{
            setLoading(false);
        }
    }

    useEffect(() => {
        instance.get('/api/socials/all/').then((response) =>{
            let data = response.data;
            setInstagram(data.INSTAGRAM);
            setEtsy(data.ETSY);
            setFaceBook(data.FACEBOOK);
        })
    })

    return(
        <div className="socialPage">
            {loading && <ModalLoader size="medium" color="#ffffff"/>}
        <div className="adminSocialHeaders">
            <h1>Seams Strange</h1>
            <h2>Socials</h2>
        </div>
        <p className="adminSocialPrompt">Add the links to your Instagram, Etsy, and Facebook for your customers<br/>
            Please note that if you wish to not have a social icon appear at the sites footer, either delete the url from the textbox or leave it blank<br/>
            </p>
        <div className="adminSocialPanelFlexContainer">
            <div className="socialInputContainer">
                <h2 className="socialInputHeader">Current Socials</h2>
                <form action=""  onSubmit={(event) => handleUpdate(event)}>
                    <label className="instagramLabel">Instagram</label>
                    <input className="instagramInput" type="url" name="instagram" value={instagram} placeholder="Instagram Link" disabled={loading}/>
                    <label className="etsyLabel">Etsy</label>
                    <input className="etsyInput" type="url" name="etsy" value={etsy} placeholder="Etsy Link" disabled={loading}/>
                    <label className="facebookLabel">Facebook</label>
                    <input className="facebookInput" type="url" name="facebook" value={facebook} placeholder="Facebook Link" disabled={loading}/>
                    <button className="socialSubmit" type="submit" disabled={loading}>Submit</button>
                </form>
            </div>
        </div>
        </div>
    )
}
export default AdminSocialPanel;