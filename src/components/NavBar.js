import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from '../styles/NavBar.module.css';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import logo from '../assets/logo.png';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const NavBar = () => {
    const currentUser = useCurrentUser();

    const loggedInIcons = (
        <>
            {currentUser?.username}
        </>
    );
    const loggedOutIcons = (
        <> 
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/login">
                <i className="fa-solid fa-key"></i>
                Log in
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup">
                <i className="fa-solid fa-user-plus"></i>
                Sign up
            </NavLink>
        </>
    );

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
                    <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to ="/">
                        <i className="fa-solid fa-house"></i>
                        Home
                    </NavLink>
                    {currentUser ? loggedInIcons : loggedOutIcons}
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
  )
}

export default NavBar