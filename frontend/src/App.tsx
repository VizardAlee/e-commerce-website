import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
  Nav,
  NavDropdown,
  Navbar,
} from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from './Store';

function App() {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode);
  }, [mode]);

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' });
  };

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [showSearch, setShowSearch] = useState(false);
  const toggleSearch = () => setShowSearch(!showSearch);

  return (
    <div className="d-flex flex-column vh-100 container-wrapper">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar
          className="the-background"
          variant="dark"
          expand="lg"
          sticky="top"
          style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
        >
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>.RUNNR</Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <LinkContainer to="/products">
                  <Nav.Link>Products</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/about">
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/contact">
                  <Nav.Link>Contact</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
                <Link
                  to="#"
                  className="nav-link"
                  onClick={switchModeHandler}
                >
                  {mode === 'light' ? 'Light Mode' : 'Dark Mode'}
                </Link>
                {userInfo ? (
                  <NavDropdown title={`Hello, ${userInfo.name}`}>
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/signin">
                    <Nav.Link>Sign In</Nav.Link>
                  </LinkContainer>
                )}
                <Link to="/cart" className="nav-link">
                  <span className="cart-badge">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Link>
                <Button
                  variant="outline-light"
                  onClick={toggleSearch}
                  className="ml-2"
                >
                  <i className="fas fa-search"></i> Search
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {showSearch && (
          <div className="the-background text-light py-2 px-3">
            <Form>
              <InputGroup>
                <FormControl
                  type="text"
                  name="q"
                  id="q"
                  placeholder="Search RUNNR"
                  aria-label="Search RUNNR"
                  aria-describedby="button-search"
                />
                <Button
                  variant="outline-light"
                  type="submit"
                  id="button-search"
                >
                  <i className="fas fa-search"></i>
                </Button>
              </InputGroup>
            </Form>
          </div>
        )}
      </header>
      <main className='the-grey main'>
        <Container className="mt-3 the-con">
          <Outlet />
        </Container>
      </main>
      <footer className="the-background text-light text-center py-3">
        <div>All rights reserved &copy; {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}

export default App;
