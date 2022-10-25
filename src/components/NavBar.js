import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from '../styles/NavBar.module.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import logo from '../assets/logo.png';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const NavBar = () => {
    const currentUser = useCurrentUser();

    const loggedInMainIcons = (
        <>
            <NavLink 
                className={styles.NavLink} 
                activeClassName={styles.Active} 
                to="/posts"
            >
                <i class="fa-solid fa-image"></i>Posts
            </NavLink>
            <NavLink 
                className={styles.NavLink} 
                activeClassName={styles.Active} 
                to="/recommendations"
            >
                <i class="fa-solid fa-thumbs-up"></i>Recommendations
            </NavLink>
            <NavLink 
                className={styles.NavLink} 
                activeClassName={styles.Active} 
                to="/events"
            >
                <i class="fa-solid fa-calendar-days"></i>Events
            </NavLink>
            <NavLink 
                className={styles.NavLink} activeClassName={styles.Active} to="/liked"
            >
                <i className="fas fa-heart"></i>Liked
            </NavLink>
        </>
    );
    const loggedInAccIcons = (
        <> 
            <NavLink 
                className={styles.NavLink} to="/" onClick={() => {}}
            >
                <i className="fas fa-sign-out-alt"></i>Sign out
            </NavLink>
        </>
    );
    const loggedOutAccIcons = (
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
            <NavLink to="/">
                <Navbar.Brand>
                    <img src={logo} alt="Logo" height="40" />
                    <span className={styles.LogoText}>Buzz of Berlin</span>
                </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-md-auto ml-sm-0 text-md-center text-sm-left">
                    <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to ="/">
                        <i className="fa-solid fa-house"></i>
                        Home
                    </NavLink>
                    {currentUser && loggedInMainIcons}
                </Nav>
                <Nav className="ml-sm-0 text-left">
                    {currentUser ? loggedInAccIcons : loggedOutAccIcons}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
  )
}

export default NavBar