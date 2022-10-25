import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import styles from '../styles/NavBar.module.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import logo from '../assets/logo.png';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import { Avatar } from './Avatar';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const handleSignOut = async () => {
        // L
        try {
          await axios.post('dj-rest-auth/logout/');
          setCurrentUser(null);
        } catch(err) {
          console.log(err);
        }
      };

    const loggedInMainIcons = (
        <>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 100, hide: 100 }}
                overlay={ <Tooltip id="posts-tooltip">Posts</Tooltip> }
            >
                <NavLink 
                    className={styles.NavLink} 
                    activeClassName={styles.Active} 
                    to="/posts"
                >
                    <i className="fa-solid fa-image"></i>
                </NavLink>
            </OverlayTrigger>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 100, hide: 100 }}
                overlay={ <Tooltip id="recommendations-tooltip">Recommendations</Tooltip> }
            >
                <NavLink 
                    className={styles.NavLink} 
                    activeClassName={styles.Active} 
                    to="/recommendations"
                >
                    <i className="fa-solid fa-thumbs-up"></i> 
                </NavLink>
            </OverlayTrigger>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 100, hide: 100 }}
                overlay={ <Tooltip id="events-tooltip">Events</Tooltip> }
            >
                <NavLink 
                    className={styles.NavLink} 
                    activeClassName={styles.Active} 
                    to="/events"
                >
                    <i className="fa-solid fa-calendar-days"></i>
                </NavLink>
            </OverlayTrigger>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 100, hide: 100 }}
                overlay={ <Tooltip id="liked-tooltip">Liked</Tooltip> }
            >
                <NavLink 
                    className={styles.NavLink} 
                    activeClassName={styles.Active} 
                    to="/liked"
                >
                    <i className="fas fa-heart"></i>
                </NavLink>
            </OverlayTrigger>
        </>
    );
    const loggedOutMainIcons = (
        <>
            <NavLink 
                className={styles.NavLink} 
                activeClassName={styles.Active} 
                to="/posts"
            >
                <i className="fa-solid fa-image"></i>
            </NavLink>
            <NavLink 
                className={styles.NavLink} 
                activeClassName={styles.Active} 
                to="/events"
            >
                <i className="fa-solid fa-calendar-days"></i>
            </NavLink>
        </>
    );
    const loggedInAccIcons = (
        <> 
            <NavLink 
                className={styles.NavLink} 
                to={`/profiles/${currentUser?.profile_id}`}
            >
                <Avatar src={currentUser?.profile_image} text='Profile' height={30} />
            </NavLink>
            <NavLink 
                className={styles.NavLink} 
                to="/" 
                onClick={handleSignOut}
            >
                <i className="fas fa-sign-out-alt"></i>Sign out
            </NavLink>
        </>
    );
    const loggedOutAccIcons = (
        <> 
            <NavLink 
                className={styles.NavLink} 
                activeClassName={styles.Active} 
                to="/login"
            >
                <i className="fa-solid fa-key"></i>
                Log in
            </NavLink>
            <NavLink 
                className={styles.NavLink} 
                activeClassName={styles.Active} 
                to="/signup"
            >
                <i className="fa-solid fa-user-plus"></i>
                Sign up
            </NavLink>
        </>
    );

return (
    <Navbar 
        className={styles.NavBar} 
        expand="md" 
    >
            <NavLink to="/">
                <Navbar.Brand>
                    <img 
                        src={logo} 
                        alt="Logo" 
                        height="40" 
                    />
                    <span className={styles.LogoText}>Buzz of Berlin</span>
                </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-md-auto ml-sm-0 text-md-center text-sm-left">
                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 100, hide: 100 }}
                        overlay={ <Tooltip id="home-tooltip">Home</Tooltip> }
                    >
                        <NavLink 
                            exact 
                            className={styles.NavLink} 
                            activeClassName={styles.Active} 
                            to ="/"
                        >
                            <i className="fa-solid fa-house"></i>
                        </NavLink>
                    </OverlayTrigger>
                    {currentUser ? loggedInMainIcons : loggedOutMainIcons}
                </Nav>
                <Nav className="ml-sm-0 text-left">
                    {currentUser ? loggedInAccIcons : loggedOutAccIcons}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
  )
}

export default NavBar