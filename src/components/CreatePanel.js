import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';

import styles from '../styles/CreatePanel.module.css';

import Navbar from 'react-bootstrap/Navbar';

import { useCurrentUser } from '../contexts/CurrentUserContext';

/**
 * Panel that is displayed on the left of the page next to the main content
 */
const CreatePanel = () => {
    const currentUser = useCurrentUser();

    const loggedInIcons = (
        <>
            <NavLink 
                className={`py-1 py-md-0 d-block ${styles.PanelLink}`} 
                activeClassName={styles.Active} 
                to="/posts/create"
            >
                <i className="fa-solid fa-square-plus"></i>
                Create post
            </NavLink>
            <NavLink 
                className={`py-1 py-md-0 d-block ${styles.PanelLink}`} 
                activeClassName={styles.Active} 
                to="/recommendations/create"
            >
                <i className="fa-solid fa-square-plus"></i>
                Create recommendation
            </NavLink>
            <NavLink 
                className={`py-1 py-md-0 d-block ${styles.PanelLink}`} 
                activeClassName={styles.Active} 
                to="/events/create"
            >
                <i className="fa-solid fa-square-plus"></i>
                Create event
            </NavLink>
        </>
    );

return (
    <Container className="px-0">
        <Navbar className={styles.NavBar} expand="md" fixed="left">
            <Nav className="flex-column text-left d-none d-md-flex text-white">
                {currentUser && loggedInIcons}
            </Nav>
            {currentUser && (
                <Dropdown className="d-flex mx-auto d-md-none">
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                    <i className="fa-solid fa-square-plus"></i> Create
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.DropDownMenu}>
                    {loggedInIcons}
                </Dropdown.Menu>
            </Dropdown>
            )}
        </Navbar>
    </Container>
  )
}

export default CreatePanel;