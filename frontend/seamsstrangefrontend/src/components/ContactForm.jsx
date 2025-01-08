import axios from "axios";
import "../styles/ContactForm.css"
import { useState } from "react";

const ContactForm = () => {

    const [sent,setSent] = useState(false);

    const handleSubmit = async (event) => {
    }
    


    return(
        <>
        <div onSubmit={(event) => handleSubmit(event)} className="contactFormContainer">
            {sent && <><h1 className="contactSentCheck">✅</h1>
            <h2 className="contactSentConfirmation">Your message has been sent</h2>
            <p className="contactSentMessage">Someone will get back to you shortly</p>
            </>}
            {!sent && <form action="">
                <h2 className="contactHeader">Get in touch</h2>
                <input className="contactName" type="text" name="name" placeholder="Your Name" required/>
                <input className="contactEmail" type="email" name="email" placeholder="Your email" required/>
                <textarea className="contactMessage" name="message" placeholder="Message" required/>
                <button className="contactSubmit" type="submit">Submit</button>
            </form>}
        </div>
        </>);
}

export default ContactForm;