import axios from "axios";
import "../styles/ContactForm.css"
import { useState } from "react";

const ContactForm = ({page}) => {

    const [sent,setSent] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);

        formData.append("sent_from",page);
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
        }
        else{
            var data = response.data;
            console.log(data.error);
        }

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