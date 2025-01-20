import "../styles/ContactCard.css"

const ContactCard = ({firstName,lastName,role,email,phoneNumber,profile}) => {

    return(
        <div className="contactCardFullContainer">
        <div className="contactCardHeaderContainer">
            <div className="contactNameHeader">
                <h1 className="firstNameContact">{firstName}</h1>
                <h2 className="lastNameContact">{lastName}</h2>
                <h3 className="roleContact">{role}</h3>
            </div>
            <img className="contactHeadshot" src={profile}/>
        </div>
        <div className="contactCardBody">
            <h2 className="contactCardDetailHeader">Phone</h2>
            <h2>{phoneNumber}</h2>
            <h2 className="contactCardDetailHeader">Email</h2>
            <h2>{email}</h2>
        </div>
        </div>
    );
}
export default ContactCard