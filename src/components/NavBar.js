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
                <Nav className="ml-auto text-left">
                    <Nav.Link>
                        <i class="fa-solid fa-house"></i>
                        Home
                    </Nav.Link>
                    <Nav.Link>
                        <i class="fa-solid fa-key"></i>
                        Log in
                    </Nav.Link>
                    <Nav.Link>
                        <i class="fa-solid fa-user-plus"></i>
                        Create account
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
  )
}

export default NavBar