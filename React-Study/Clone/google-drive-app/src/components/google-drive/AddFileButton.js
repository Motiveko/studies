import ReactDOM from 'react-dom';
import {  faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { addFile, uploadFile } from "../../firebase";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { v4 as uuidV4 } from 'uuid'
import { ProgressBar, Toast } from 'react-bootstrap';

export default function AddFileButton({ currentFolder, handleUploadCompletion }) {
  const { currentUser } = useAuth();
  const [uploadingFiles, setUploadingFiles] = useState([]);
  
  const handleUpload = (e) => {

    e.preventDefault();
    
    const file = e.target.files[0];
    if(currentFolder == null || file == null) return;

    const id = uuidV4();
    setUploadingFiles(prevUploadingFiles => [
      ...prevUploadingFiles,
      { id, name: file.name, progress: 0, error: false}
    ])

    const filePath = (currentFolder === ROOT_FOLDER
      ? ''
      : currentFolder.path.length > 0
        ? `${currentFolder.path.map((p) => p.name).join('/')}/${currentFolder.name}/`
        : `${currentFolder.name}/`) + file.name;

    const uploadTask = uploadFile(currentUser.uid, filePath, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes); 
        setUploadingFiles(prevUploadingFiles => prevUploadingFiles.map(uploadingFile => {
          if(uploadingFile.id === id) {
            return { ...uploadingFile, progress};
          }
          return {...uploadingFile}
        }))
        console.log(uploadingFiles)
      },
      (err) => {
        alert('파일 업로드중 문제가 발생했습니다.');
        console.error(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          addFile({
            url,
            name:file.name,
            folder: currentFolder.id,
            userId: currentUser.uid
          })
        });
        // 업로드 완료 즉시 다시 가져오면 안가져와짐
        setTimeout(() => handleUploadCompletion(),500); 
      }

    )
    
  }

  const removeUploadingFile = (id) => {
    setUploadingFiles(prevUploadingFiles => prevUploadingFiles
      .filter(file => file.id !== id));
  }

  return (
    <>
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
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              maxWidth: '250px'
            }}>
              {uploadingFiles.map((file) => 
                <Toast key={file.id} onClose={() => removeUploadingFile(file.id)}>
                  <Toast.Header 
                    closeButton={file.error || file.progress === 1 }
                    className="d-flex"
                  >
                    <div className="text-truncate">{file.name}</div>
                  </Toast.Header>
                  <Toast.Body>
                    <ProgressBar 
                      animated={!file.error}
                      variant={file.error ? 'danger' : 'primary'}
                      now={file.error ? 100 : file.progress * 100 }
                      label={
                        file.error 
                          ? 'Error' 
                          : `${Math.round(file.progress * 100)}%`
                      }
                    />
                  </Toast.Body>
                </Toast>
              )}
          </div>, document.body
        )
      }
    </>
  )
}