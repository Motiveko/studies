import { useCallback, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { useFolder } from "../../hooks/useFolder";
import AddFileButton from "./AddFileButton";
import AddFolderButton from "./AddFolderButton";
import File from "./File";
import Folder from "./Folder";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import Navbar from "./Navbar";

export default function Dashboard() {
  const { folderId } = useParams();
  const { state } = useLocation();
  const [refresher, setRefresher] = useState(false);
  const { folder, childFolders, childFiles } = useFolder(folderId, state?.folder, refresher);
  const refreshFolderContext = useCallback(() => setRefresher(!refresher),[refresher]);
  return (
    <>
      <Navbar />
      <Container fluid >
        <div className='d-flex align-items-center'>
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFileButton currentFolder={folder} handleUploadCompletion={refreshFolderContext} />
          <AddFolderButton currentFolder={folder} handleUploadCompletion={refreshFolderContext} />
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
        
        {childFolders?.length > 0 && childFiles.length > 0 && <hr />}

        {childFiles?.length > 0 &&
          <div className="d-flex flex-wrap">
            {childFiles.map(childFile => (
              <div key={childFile.id} 
                style={{maxWidth: '250px'}} 
                className="p-2"
              >
                <File file={childFile} handleRemoveCompletion={refreshFolderContext}/>
              </div>
            ))}            
          </div>
        }
        {/* {folder && <Folder folder={folder}/>} */}
      </Container>
    </>
  )
}  