import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Folder({ folder }) {
  return (
    // "text-truncate + w-100" 두개를 같이써야 긴 텍스트를 max-width에 맞춰 짤라준다.
    <Button variant="outline-dark" as={Link} to={`/folder/${folder.id}`} className="text-truncate w-100" >
      <FontAwesomeIcon icon={faFolder} style={{'marginRight': '1rem'}} />
      {folder.name} 
    </Button>
  )
  
}