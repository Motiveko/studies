import React, { useCallback, useMemo } from "react";
import {
  Container, Image, Navbar, NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LinkButton from "../components/Buttons/LinkButton";
import CustomHR from "../components/CustomHR";
import { actions } from "../store/auth";
import useAuth from "../store/auth/useAuth";

function Header() {
  const { user, dispatch } = useAuth();

  const logout = useCallback(() => {
    dispatch(actions.tryLogout());
  }, [dispatch]);
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
    if (!user) return null;
    const thumbnail = user?.photoURL;

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
  }, [user]);

  return (
    <>
      <Navbar style={{ height: "60px" }}>
        <Container>
          <Navbar.Brand as={Link} to={{ pathname: "/" }}>
            ๐ค Devlog
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            {user && (
              <>
                <LinkButton to="/user/post" variant="outline-dark">
                  ์ ๊ธ ์์ฑ
                </LinkButton>
                <Navbar.Text>
                  <NavDropdown
                    title={userAvatar}
                    id="navbarScrollingDropdown"
                    onSelect={handleSelect}
                  >
                    <NavDropdown.Item
                      as={Link}
                      to={{ pathname: `/user/${user.uid}` }}
                    >
                      ๋ด ๋ธ๋ก๊ทธ
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to={{ pathname: "/user/settings" }}
                    >
                      ์ค์?
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item as={Link} to={{ pathname: '/user/tempPost' }}>
                      ์์ ๊ธ
                    </NavDropdown.Item> */}
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey={NAVBAR_EVENT_KEYS.LOGOUT}>
                      ๋ก๊ทธ์์
                    </NavDropdown.Item>
                  </NavDropdown>
                </Navbar.Text>
              </>
            )}
            {!user && (
              <Navbar.Text>
                <LinkButton to="/auth/login" variant="dark">
                  ๋ก๊ทธ์ธ
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
