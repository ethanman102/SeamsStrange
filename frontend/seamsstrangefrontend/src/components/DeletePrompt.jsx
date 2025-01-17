import "../styles/DeletePrompt.css"

const DeletePrompt = ({deleteObject,deleteCallback}) => {
    return(
        <div className="deletePromptContainer">
            <h2 className="deletePromptHeader">Delete {deleteObject}</h2>
            <p className="deletePromptText">Are you sure you want to delete this {deleteObject}?<br/>
            This action can not be undone.</p>
            <button className="deletePromptButton" onClick={deleteCallback}>Confirm</button>
        </div>
    )
}
export default DeletePrompt