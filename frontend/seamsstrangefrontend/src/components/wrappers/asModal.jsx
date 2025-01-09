import { useState } from "react"

const asModal = (WrappedComponent) => {
    const modalfiedComponent = (props) =>{
        const [isOpen,setIsOpen] = useState(props.openModal);

        return(
        <div className="modal" style={{display: isOpen ? "block" : "none",position: "fixed"}}>
            <WrappedComponent {...props}/>
            <button onClick={() => setIsOpen(!isOpen)}>Close</button>
        </div>
        );
    }
    return modalfiedComponent;
}

export default asModal;