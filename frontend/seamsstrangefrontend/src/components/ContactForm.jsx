import "../styles/ContactForm.css"

const ContactForm = () => {


    return(
        <div className="contactFormContainer">
            <form action="">
                <h2>Get in touch</h2>
                <input className="contactName" type="text" name="name" placeholder="Your Name" required/>
                <input className="contactEmail" type="email" name="email" placeholder="Your email" required/>
                <textarea className="contactMessage" name="message" placeholder="Message" required/>
                <button className="contactSubmit" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ContactForm;