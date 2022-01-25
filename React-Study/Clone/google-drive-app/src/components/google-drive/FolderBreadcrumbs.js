import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROOT_FOLDER } from "../../hooks/useFolder";

export default function FolderBreadcrumbs ({ currentFolder  }) {
  const path = [ROOT_FOLDER, ...(currentFolder ? currentFolder.path : [])];
  console.log(path)
  return (
    <Breadcrumb 
        className="flex-grow-1"
        listProps={{className: 'bg-white pl-0 m-0'}}>
      {path.map((folder, index) => 
        <Breadcrumb.Item
          key={folder.id}
          linkAs={Link}
          linkProps={{
            to: folder.id ? `/folder/${folder.id}` : '/'
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