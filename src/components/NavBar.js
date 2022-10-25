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


/**
 * Returns the navigation bar.
 * Some of the code was taken from the Moments walkthrough, but most of it was written manually.
 */
const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const handleSignOut = async () => {
        // Signs out the current user
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
                overlay={ 
                    <Tooltip 
                        className={`d-sm-none d-md-flex ${styles.ToolTip}`}  
                        id="posts-tooltip"
                    >
                        Posts
                    </Tooltip> 
                }
            >
                <NavLink 
                    className={`px-md-3 ${styles.NavLink}`} 
                    activeClassName={styles.Active} 
                    to="/posts"
                >
                    <i className="fa-solid fa-fw fa-image"></i>
                    <span className="d-sm-inline d-md-none pl-2">Posts</span>
                </NavLink>
            </OverlayTrigger>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 100, hide: 100 }}
                overlay={ 
                    <Tooltip 
                        className={`d-sm-none d-md-flex ${styles.ToolTip}`}  
                        id="recommendations-tooltip"
                    >
                        Recommendations
                    </Tooltip> 
                }
            >
                <NavLink 
                    className={`px-md-3 ${styles.NavLink}`} 
                    activeClassName={styles.Active}
                    to="/recommendations"
                >
                    <i className="fa-solid fa-fw fa-thumbs-up"></i>
                    <span className="d-sm-inline d-md-none pl-2">Recommendations</span>
                </NavLink>
            </OverlayTrigger>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 100, hide: 100 }}
                overlay={ 
                    <Tooltip 
                        className={`d-sm-none d-md-flex ${styles.ToolTip}`}  
                        id="events-tooltip"
                    >
                        Events
                    </Tooltip> 
                }
            >
                <NavLink 
                    className={`px-md-3 ${styles.NavLink}`} 
                    activeClassName={styles.Active} 
                    to="/events"
                >
                    <i className="fa-solid fa-fw fa-calendar-days"></i>
                    <span className="d-sm-inline d-md-none pl-2">Events</span>
                </NavLink>
            </OverlayTrigger>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 100, hide: 100 }}
                overlay={ 
                    <Tooltip 
                        className={`d-sm-none d-md-flex ${styles.ToolTip}`}  
                        id="liked-tooltip"
                    >
                        Liked
                    </Tooltip> 
                }
            >
                <NavLink 
                    className={`px-md-3 ${styles.NavLink}`} 
                    activeClassName={styles.Active} 
                    to="/liked"
                >
                    <i className="fas fa-fw fa-heart"></i>
                    <span className="d-sm-inline d-md-none pl-2">Liked</span>
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
                <i className="fa-solid fa-fw fa-image"></i>
            </NavLink>
            <NavLink 
                className={styles.NavLink} 
                activeClassName={styles.Active} 
                to="/events"
            >
                <i className="fa-solid fa-fw fa-calendar-days"></i>
                <span className="d-sm-inline d-md-none pl-2">Events</span>
            </NavLink>
        </>
    );
    const loggedInAccIcons = (
        <>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 100, hide: 100 }}
                overlay={ 
                    <Tooltip 
                        className={`d-sm-none d-md-flex ${styles.ToolTip}`} 
                        id="profile-tooltip"
                    >
                        Profile
                    </Tooltip> 
                }
            >
                <NavLink 
                    className={`px-md-3 ${styles.NavLink}`} 
                    to={`/profiles/${currentUser?.profile_id}`}
                >
                    <Avatar src={currentUser?.profile_image} text='' height={30} />
                    <span className="d-sm-inline d-md-none pl-2">Profile</span>
                </NavLink>
            </OverlayTrigger>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 100, hide: 100 }}
                overlay={ 
                    <Tooltip 
                        className={`d-sm-none d-md-flex ${styles.ToolTip}`}  
                        id="sign-out-tooltip"
                    >
                        Sign out
                    </Tooltip> 
                }
            >
                <NavLink 
                    className={`pl-md-3 pr-md-2 ${styles.NavLink}`} 
                    to="/" 
                    onClick={handleSignOut}
                >
                    <i className="fas fa-fw fa-sign-out-alt"></i>
                    <span className="d-sm-inline d-md-none pl-2">Sign out</span>
                </NavLink>
            </OverlayTrigger>
        </>
    );
    const loggedOutAccIcons = (
        <> 
            <NavLink 
                className={styles.NavLink} 
                activeClassName={styles.Active} 
                to="/login"
            >
                <i className="fa-solid fa-fw fa-key"></i>
                Log in
            </NavLink>
            <NavLink 
                className={styles.NavLink} 
                activeClassName={styles.Active} 
                to="/signup"
            >
                <i className="fa-solid fa-fw fa-user-plus"></i>
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
                <Nav className="m-md-auto ml-sm-0 text-sm-left">
                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 100, hide: 100 }}
                        overlay={ 
                            <Tooltip 
                                className={`d-sm-none d-md-flex ${styles.ToolTip}`}  
                                id="home-tooltip"
                            >
                                Home
                            </Tooltip> 
                        }
                    >
                        <NavLink 
                            exact 
                            className={`px-md-3 ${styles.NavLink}`} 
                            activeClassName={styles.Active} 
                            to ="/"
                        >
                            <i className="fa-solid fa-fw fa-house"></i>
                            <span className="d-sm-inline d-md-none pl-2">Home</span>
                        </NavLink>
                    </OverlayTrigger>
                    {currentUser ? loggedInMainIcons : loggedOutMainIcons}
                </Nav>
                <Nav className="ml-sm-0 text-sm-left">
                    {currentUser ? loggedInAccIcons : loggedOutAccIcons}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;