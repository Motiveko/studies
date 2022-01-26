import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROOT_FOLDER } from "../../hooks/useFolder";

export default function FolderBreadcrumbs ({ currentFolder  }) {
  const path = [ROOT_FOLDER, ...(currentFolder ? currentFolder.path : [])];
  // TODO : Root에서 Root breadcrumb 클릭시 useFolder에서 childFolders가 사라지게 되는 현상이 있다. 해결해야함.
  return (
    <Breadcrumb 
        className="flex-grow-1"
        listProps={{className: 'bg-white pl-0 m-0'}}>
      {path.map((folder, index) => 
        <Breadcrumb.Item
          key={folder.id}
          linkAs={Link}
          linkProps={{
            to: folder.id ? `/folder/${folder.id}` : '/',
            state: { folder: {...folder, path: path.slice(1, index)}}
          }}
          className="text-truncate d-inline-block"
          style={{maxWidth: '200px'}}
        >
          {folder.name}
        </Breadcrumb.Item> 
      )}

      {currentFolder?.id && 
        <Breadcrumb.Item
          className="text-truncate d-inline-block"
          style={{maxWidth: '200px'}}
          active
        >
          {currentFolder.name}
        </Breadcrumb.Item>
      }
    </Breadcrumb>
  )
}