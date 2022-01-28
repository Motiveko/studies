import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addFolder, addFile } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
import { ROOT_FOLDER } from "../../hooks/useFolder";
export default function AddFolderButton({ currentFolder, handleUploadCompletion }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const { currentUser } = useAuth();

  const openModal = () => {
    setOpen(true);
  } 
  
  const closeMoal = () => {
    setOpen(false);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(currentFolder == null) return;

    const path = [...currentFolder.path]; // 복사
    if(currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    await addFolder({ 
      name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path,
    })

    setName('')
    handleUploadCompletion();
    closeMoal();
  }

  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="sm">
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>
      <Modal show={open} onHide={closeMoal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder name</Form.Label>
              <Form.Control 
                type="text" 
                required value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeMoal}>
              Close
            </Button>
            <Button
              variant="success"
              type="submit"
            >
              Submit
            </Button>
          </Modal.Footer>
        </Form>

      </Modal>
    </>
  )
}