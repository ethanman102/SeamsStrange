const ImageUploader = ({handleUpload}) =>{

    const handleChange = (event) => {
        let files = event.target.files;
        let fileURL = URL.createObjectURL(files[0]);
        handleUpload(fileURL);
    }

    return(
    <form>
        <label htmlFor="fileUpload" className="fileUploadButton">Upload Image</label>
        <input accept="image/*" style={{visibility:"hidden"}} id="fileUpload" type="file" onChange={(event) => handleChange(event)}/>
    </form>
    );
}
export default ImageUploader;