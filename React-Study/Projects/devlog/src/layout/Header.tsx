import React, { useMemo } from "react";
import {
  Container, Image, Navbar, NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LinkButton from "../components/Buttons/LinkButton";
import CustomHR from "../components/CustomHR";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const handleSelect = async (eventKey: string | null) => {
    switch (eventKey) {
      case NAVBAR_EVENT_KEYS.LOGOUT:
        await logout();
        navigate("/");
        break;
      default:
        break;
    }
  };

  const userAvatar = useMemo(() => {
    if (!currentUser) return null;
    const thumbnail = currentUser?.photoURL;

    return (
      <Image
        src={thumbnail}
        className="me-2"
        style={{
          width: "2rem",
          height: "2rem",
          borderRadius: "50%",
          position: "relative",
        }}
      />
    );
  }, [currentUser]);

  return (
    <>
      <Navbar style={{ height: "60px" }}>
        <Container>
          <Navbar.Brand as={Link} to={{ pathname: "/" }}>
            🤖 Devlog
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            {currentUser && (
              <>
                <LinkButton to="/user/post" variant="outline-dark">
                  새 글 작성
                </LinkButton>
                <Navbar.Text>
                  <NavDropdown
                    title={userAvatar}
                    id="navbarScrollingDropdown"
                    onSelect={handleSelect}
                  >
                    <NavDropdown.Item
                      as={Link}
                      to={{ pathname: `/user/${currentUser.uid}` }}
                    >
                      내 블로그
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to={{ pathname: "/user/settings" }}
                    >
                      설정
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item as={Link} to={{ pathname: '/user/tempPost' }}>
                      임시 글
                    </NavDropdown.Item> */}
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey={NAVBAR_EVENT_KEYS.LOGOUT}>
                      로그아웃
                    </NavDropdown.Item>
                  </NavDropdown>
                </Navbar.Text>
              </>
            )}
            {!currentUser && (
              <Navbar.Text>
                <LinkButton to="/auth/login" variant="dark">
                  로그인
                </LinkButton>
              </Navbar.Text>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CustomHR />
    </>
  );
}

const NAVBAR_EVENT_KEYS = {
  LOGOUT: "logout",
};

export default React.memo(Header);
