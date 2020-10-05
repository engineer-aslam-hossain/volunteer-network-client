import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import logo from "../../images/logos/Group 1329.png";
import "./Header.css";
const Header = () => {
  const { LoggedInUser, SetLoggedInUser } = useContext(UserContext);
  return (
    <Navbar expand='lg'>
      <Navbar.Brand>
        <Link to='/'>
          <img style={{ width: "10rem" }} src={logo} alt='' />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          <Nav.Link href='#home'>Home</Nav.Link>
          <Nav.Link href='#donation'>Donation</Nav.Link>
          <Nav.Link>
            <Link to='/events' className='text-decoration-none text-secondary'>
              Event
            </Link>
          </Nav.Link>
          <Nav.Link href='#blog'>Blog</Nav.Link>
          {LoggedInUser.email ? (
            <Nav.Link>{LoggedInUser.displayName}</Nav.Link>
          ) : (
            <>
              <Link to='/register' className='btn btn-primary mr-3'>
                Register
              </Link>
              <Link to='/admin' className='btn btn-secondary'>
                Admin
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
