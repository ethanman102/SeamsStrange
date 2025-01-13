import { useRef } from "react";

const ImageUploader = ({handleUpload}) =>{

    const fileRef = useRef('');

    const handleChange = (event) => {
        let files = event.target.files;
        let fileURL = URL.createObjectURL(files[0]);
        handleUpload(fileURL);
        fileRef.current = '';
    }

    return(
    <form>
        <label htmlFor="fileUpload" className="fileUploadButton">Upload Image</label>
        <input accept="image/*" value={fileRef.current} style={{visibility:"hidden"}} id="fileUpload" type="file" onChange={(event) => handleChange(event)}/>
    </form>
    );
}
export default ImageUploader;