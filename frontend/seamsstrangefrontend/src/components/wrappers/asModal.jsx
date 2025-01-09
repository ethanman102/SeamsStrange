import { useEffect, useState } from "react"
import "../../styles/asModal.css"

const asModal = (WrappedComponent) => {
    const modalfiedComponent = (props) =>{
        const [isOpen,setIsOpen] = useState(false);

        useEffect(() => {
            if (props.openModal !== 0) setIsOpen(true);
        }, [props.openModal]);


        return(
        <div className="modal" style={{display: isOpen ? "block" : "none",position: "fixed"}}>
            <div className="modalContent">
                <WrappedComponent {...props}/>
                <button onClick={() => setIsOpen(!isOpen)} className="modalCloseButton">Close</button>
            </div>
        </div>
        );
    }
    return modalfiedComponent;
}

export default asModal;