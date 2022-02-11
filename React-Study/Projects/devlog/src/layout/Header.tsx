import React, { useMemo } from 'react';
import { Container, Image, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LinkButton from '../components/Buttons/LinkButton';
import UI_CONST from '../constants/UIConstant';
import { useAuth } from '../context/AuthContext';
import { getRandomNumber } from '../utils/random-util';

function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  console.log(currentUser);
  const handleSelect = (eventKey: string | null) => {
    switch (eventKey) {
      case NAVBAR_EVENT_KEYS.LOGOUT:
        logout().then(() => navigate('/'));
        break;
    }
  };

  const userAvatar = useMemo(() => {
    const email = currentUser?.email;
    // TODO : user 아바타 이미지 생기면 그거 가져다 쓰기
    const thumbnail = UI_CONST.ANONYMOUSE_THUMBNAIL[getRandomNumber(UI_CONST.ANONYMOUSE_THUMBNAIL.length)];

    return <Image src={`/assets/animals/${thumbnail}.png`} className="me-2" style={{ width: '2rem', height: '2rem', position: 'relative' }} />;
  }, [currentUser]);

  return (
    <Navbar style={{ height: '60px' }}>
      <Container>
        <Navbar.Brand as={Link} to={{ pathname: '/' }}>
          🤖 Devlog
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          {currentUser && (
            <>
              <LinkButton to="/user/newPosts" variant="outline-dark">
                새 글 작성
              </LinkButton>
              <Navbar.Text>
                <NavDropdown title={userAvatar} id="navbarScrollingDropdown" onSelect={handleSelect}>
                  <NavDropdown.Item as={Link} to={{ pathname: '/userID' }}>
                    내 글 목록
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={{ pathname: '/user/settings' }}>
                    설정
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={{ pathname: '/user/tempPost' }}>
                    임시 글
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey={NAVBAR_EVENT_KEYS.LOGOUT}>로그아웃</NavDropdown.Item>
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
  );
}

const NAVBAR_EVENT_KEYS = {
  LOGOUT: 'logout',
};

export default React.memo(Header);
