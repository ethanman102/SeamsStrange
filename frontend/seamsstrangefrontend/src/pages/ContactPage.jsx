import "../styles/ContactPage.css"
import image1 from "../assets/image1.jpg"
import ContactForm from "../components/ContactForm";
import ContactCard from "../components/ContactCard";

const ContactPage = () =>{
    return(
    <div className="contactPage">
    <div className="contactPageHeader">
        <h1>Contact</h1>
        <h2>Seams Strange</h2>
    </div>
        <div className="contactPageContainer">
            <div className="imageContainer">
                <img className="contactImageOne" src={image1}/>
                <p className="buyerTextOne">Hi, I saw you had a some flower designs.<br/>
                Do you have any with roses?<br/>
                <span className="textTimestamp">Wednesday 5:47pm</span></p>
                <p className="sellerTextOne"> Hey, thanks for the message!<br/> At this moment we have only done tulips and carnations <br/>
                But we could definetely create a rose 🌹 design for you!<br/> Were you looking for a hat, shirt, pants...?
                <br/>
                <span className="textTimestamp">Wednesday 5:53pm</span>
                </p>
                <p className="buyerTextOne">Hi, I saw you had a some flower designs.<br/>
                Do you have any with roses?<br/>
                <span className="textTimestamp">Wednesday 5:47pm</span></p>
                <p className="buyerTextTwo">I was actually wondering if you do bandannas<br/>
                I was looking to treat my miniature sheepadoodle Blu with a fresh style!<br/>
                <span className="textTimestamp">Wednesday 5:57pm</span></p>
                <p className="sellerTextTwo">That's so adorable! We do infact embroider bandannas.<br/>
                Funny enough I have also done the same for my dog Bree, and she loves it!<br/>Let's talk over the phone so we can get an idea regarding some designs.<br/>
                <span className="textTimestamp">Wednesday 6:01pm</span></p>
                <p className="buyerTextThree">Perfect thanks for the help!<br/>
                I'll be able to hop on the phone in five minutes.<br/>
                <span className="textTimestamp">Wednesday 6:04pm</span></p>
            </div>
        </div>
        <h2 className="contactPageInquiryTextRight">"Looking to get more information on our business? A specific design you had in mind? Pricing?<br/>
        Don't hesitate to send us your inquiry, visit us in our office, or give us a phone call"</h2>
        <h2 className="ourTeamHeader">Our Team</h2>
        <div className="companyDetailsContact">
            <ContactCard firstName="Debbie" lastName="Keys" role="Emroider" profile="" phoneNumber="780-340-5397" email="SeamsStrange@gmail.com"/>
            <ContactCard firstName="Ron" lastName="Keys" profile="" role="Designer" phoneNumber="780-297-4792" email="SeamsStrange@gmail.com"/>
        </div>
        <h2 className="contactPageInquiryLeft">"We aim to respond to all inquires within 1 - 2 business days<br/> For a faster response please phone us."</h2>
        <div className="contactFormSection">
            <h2 className="generalContactHeader">General Contact Form</h2>
            <p className="generalContactPrompt">All submissions through our general contact form will be emailed directly to one of our employees.<br/>
            Please leave your name, email, and inquiry below and we'll get back to you at our earliest availability.</p>
            <ContactForm page="Contact Page"/>
        </div>
        </div>
    );
}
export default ContactPage;