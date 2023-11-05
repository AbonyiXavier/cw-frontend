import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>CobbleWeb</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='ms-auto'>
            
          {userInfo ? (
                <div className="d-flex align-items-center">
                  <NavDropdown>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  
                  <p className="m-0 me-2 text-white">
                    Welcome, {userInfo?.client?.fullName}
                  </p>
                  {userInfo.client.avatar && (
                    <img
                      src={userInfo?.client?.avatar}
                      alt="User Avatar"
                      className="avatar-img"
                      style={{ maxWidth: '40px', maxHeight: '40px',  filter: 'brightness(0) invert(1)' }}
                    />
                  )}
                </div>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
