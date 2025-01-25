
import "../../styles/asModal.css"

const asModal = (WrappedComponent) => {
    const modalfiedComponent = (props) =>{
        const handleClose = () =>{
            if (props.modalSwitch) props.modalSwitch(0);
        }


        return(
        <div className="modal" style={{display: "block" ,position: "fixed"}}>
            <div className="modalContent">
                <WrappedComponent {...props}/>
                {props.closeable && <button onClick={handleClose} className="modalCloseButton">Close</button>}
            </div>
        </div>
        );
    }
    return modalfiedComponent;
}

export default asModal;