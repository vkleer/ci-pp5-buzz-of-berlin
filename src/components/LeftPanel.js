import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import styles from '../styles/LeftPanel.module.css';

import Navbar from 'react-bootstrap/Navbar';

import { useCurrentUser } from '../contexts/CurrentUserContext';

/**
 * Panel that is displayed on the left of the page next to the main content
 */
const LeftPanel = () => {
    const currentUser = useCurrentUser();

    const loggedInIcons = (
        <>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/posts/create">
                <i className="fa-solid fa-square-plus"></i>Create post
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/posts/create">
                <i className="fa-solid fa-square-plus"></i>Create recommendation
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/posts/create">
                <i className="fa-solid fa-square-plus"></i>Create event
            </NavLink>
        </>
    );

return (
    <Container className="px-0">
        <Navbar className={styles.NavBar} expand="md" fixed="left">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="flex-column text-left">
                    {currentUser && loggedInIcons}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Container>
  )
}

export default LeftPanel