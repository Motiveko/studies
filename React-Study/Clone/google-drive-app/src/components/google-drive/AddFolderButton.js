import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { database, firestore } from '../../firebase'
import { collection, addDoc } from "firebase/firestore";

export default function AddFolderButton() {
  
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const openModal = () => {
    setOpen(true);
  }
  
  const closeMoal = () => {
    setOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // database.folders.add({
    //   name
    // })

    await addDoc(collection(firestore, 'folders') ,{ 
      name,
      // parentId,
      // userId,
      // path,
      // createdAt
    });

    setName('')
    closeMoal();
  }

  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="small">
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