import {  faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../context/AuthContext";
import { uploadFile } from "../../firebase";
import { ROOT_FOLDER } from "../../hooks/useFolder";

export default function AddFileButton({ currentFolder }) {
  const { currentUser } = useAuth();

  const handleUpload = (e) => {
    e.preventDefault();
    console.dir(e.target)
    const file = e.target.files[0];
    if(currentFolder == null || file == null) return;
        
    const filePath = (currentFolder === ROOT_FOLDER
      ? ''
      : currentFolder.path.length > 0
        ? `${currentFolder.path.map((p) => p.name).join('/')}/${currentFolder.name}/`
        : `${currentFolder.name}/`) + file.name;


    console.log(`uploadPath : ${filePath}`);

    const uploadTask =  uploadFile(currentUser.uid, filePath, file);
  }

  return (
    <label className="btn btn-outline-success btn-sm me-2">
      <FontAwesomeIcon icon={faFileUpload} />
      <input
        type="file"
        onChange={handleUpload}
        style={{
          opacity:0,
          position: "absolute",
          left: "-9999px"
        }}
      />
    </label>
  )
}