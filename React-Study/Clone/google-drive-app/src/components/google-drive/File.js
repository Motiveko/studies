import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { useFolder } from "../../hooks/useFolder";
import { Button } from "react-bootstrap";
import { deleteFile, formatDoc, getFolder } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

export default function File ({ file, handleRemoveCompletion}) {
  console.log(file)
  const { currentUser } = useAuth();
  

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if(window.confirm('파일을 증말 삭제하시겠습니까?')) {

      deleteFile(currentUser.uid, file)
        .then(() => {
          window.alert('파일을 삭제하였습니다.');
          handleRemoveCompletion();
        })
        .catch(e => console.error(e));
    }
    
  }
  return (
    <>
      
        <a href={file.url} target="_blank" rel="noreferrer" className="btn btn-outline-dark d-flex me-1">
          <FontAwesomeIcon icon={faFile} className="me-2" />
          <div className="text-truncate">{file.name}</div>
          <Button className="btn-close ms-1" onClick={handleRemove}  />
        </a>
      
    </>
  )
}