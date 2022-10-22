import React from 'react';
import {Navbar} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top">
        <Container>
            <Navbar.Brand>Buzz of Berlin</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link>Home</Nav.Link>
                    <Nav.Link>Log in</Nav.Link>
                    <Nav.Link>Create account</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
  )
}

export default NavBar