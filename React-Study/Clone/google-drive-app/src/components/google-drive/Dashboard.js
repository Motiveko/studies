import { Container } from "react-bootstrap";
import { useFolder } from "../../hooks/useFolder";
import AddFolderButton from "./AddFolderButton";
import Navbar from "./Navbar";

export default function Dashboard() {
  
  const { folder } = useFolder('hMXT9h6daC4iWMb9lkrL');
  console.log(folder)
  return (
    <>
      <Navbar />
      <Container fluid >
        hi
        <AddFolderButton currentFolder={folder} />
      </Container>
    </>
  )
}  