import { useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { useFolder } from "../../hooks/useFolder";
import AddFileButton from "./AddFileButton";
import AddFolderButton from "./AddFolderButton";
import Folder from "./Folder";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import Navbar from "./Navbar";

export default function Dashboard() {
  const { folderId } = useParams();
  const { state } = useLocation();
  const [addFileFolder, setAddFileFolder] = useState(false);
  const { folder, childFolders } = useFolder(folderId, state?.folder, addFileFolder);

  const addFileAndFolder = () => setAddFileFolder(!addFileFolder);
  return (
    <>
      <Navbar />
      <Container fluid >
        <div className='d-flex align-items-center'>
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFileButton currentFolder={folder} handleAddFolderAndFile={addFileAndFolder} />
          <AddFolderButton currentFolder={folder} handleAddFolderAndFile={addFileAndFolder} />
        </div>
        {childFolders?.length > 0 && 
          <div className="d-flex flex-wrap"> 
            {childFolders.map(childFolder => (
              <div key={childFolder.id} 
                style={{maxWidth: '250px'}} 
                className="p-2"
              >
                <Folder folder={childFolder}/>
              </div>
            ))}
          </div>
        }
        {/* {folder && <Folder folder={folder}/>} */}
      </Container>
    </>
  )
}  