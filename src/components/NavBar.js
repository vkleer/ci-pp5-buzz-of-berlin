import React from 'react';
import styles from '../styles/NavBar.module.css';
import {Navbar} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import logo from '../assets/logo.png';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
        <Container>
            <NavLink to="/">
                <Navbar.Brand>
                    <img src={logo} alt="Logo" height="40" />
                    <span className={styles.LogoText}>Buzz of Berlin</span>
                </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto text-left">
                    <NavLink to ="/">
                        <i class="fa-solid fa-house"></i>
                        Home
                    </NavLink>
                    <NavLink to="/login">
                        <i class="fa-solid fa-key"></i>
                        Log in
                    </NavLink>
                    <NavLink to="/signup">
                        <i class="fa-solid fa-user-plus"></i>
                        Sign up
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
  )
}

export default NavBar