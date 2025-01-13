import "../styles/ContactPage.css"
import noImage from "../assets/seamsstrangelogindesign.jpg"
import ContactForm from "../components/ContactForm";

const ContactPage = () =>{
    return(
    <div className="contactPage">
    <div className="contactPageHeader">
        <h1>Contact</h1>
        <h2>Seams Strange</h2>
    </div>
        <div className="contactPageContainer">
            <div className="imageContainer">
                <img className="contactImageOne" src={noImage}/>
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
        <h2 className="contactPageInquiryText">Looking to get more information on our business? A specific design you had in mind? Pricing?<br/>
        Don't hesitate to send us your inquiry, visit us in our office, or give us a phone call</h2>
        <ContactForm/>
        </div>
    );
}
export default ContactPage;