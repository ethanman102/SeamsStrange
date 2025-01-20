import axios from "axios";
import "../styles/ContactForm.css"
import { useState,useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ThreeDot } from "react-loading-indicators";

const ContactForm = ({page}) => {

    const [sent,setSent] = useState(false);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const recaptchaRef = useRef();

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        if (!recaptchaRef.current.getValue()){
            // recaptcha was not attempted.
            setError(true);
            setLoading(false);
            recaptchaRef.current.reset();
            return;
        }
        let formData = new FormData(event.target);

        formData.append("sent_from",page);
        formData.append("recaptchaValue",recaptchaRef.current.getValue());
        let object = Object.fromEntries(formData);
        let json = JSON.stringify(object);

        let response = await axios.post('http://localhost:8000/api/email/',
            json,
            {
                headers:{
                    "Content-Type": "application/json"
                }
            }
        );
        if (response.status === 200){
            setSent(true);
            setLoading(false);
        }
        else{
            setLoading(false);
            recaptchaRef.current.reset();
        }

    }
    


    return(
        <>
        <div onSubmit={(event) => handleSubmit(event)} className="contactFormContainer">
            {sent && <><h1 className="contactSentCheck">✅</h1>
            <h2 className="contactSentConfirmation">Your message has been sent</h2>
            <p className="contactSentMessage">Someone will get back to you shortly</p>
            </>}
            {loading && <ThreeDot size="medium" color="#ffffff"/>}
            {!sent && <><form action="">
                <h2 className="contactHeader">Get in touch</h2>
                <label className="contactNameLabel">Name</label>
                <input className="contactName" type="text" name="name" placeholder="Your Name" required disabled={loading}/>
                <label className="contactEmailLabel">Email</label>
                <input className="contactEmail" type="email" name="email" placeholder="Your email" required disabled={loading}/>
                <textarea className="contactMessage" name="message" placeholder="Message" required disabled={loading}/>
                <ReCAPTCHA className="recaptcha" sitekey="6LewaLEqAAAAAKhyx4RWdDUzqbk0oRK2Xw2VL78b" onChange={(value) => setRecaptchaValue(value)} ref={recaptchaRef}/>
                {error && <p className="errorMessage">Please Complete the ReCAPTCHA</p>}
                <button className="contactSubmit" type="submit" disabled={loading}>Submit</button>
            </form>
            </>}
        </div>
        </>);
}

export default ContactForm;