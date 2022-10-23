import React from 'react';
import styles from '../styles/NavBar.module.css';
import {Navbar} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import logo from '../assets/logo.png';

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
        <Container>
            <Navbar.Brand>
                <img src={logo} alt="Logo" height="40" />
                <span className={styles.LogoText}>Buzz of Berlin</span>
            </Navbar.Brand>
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