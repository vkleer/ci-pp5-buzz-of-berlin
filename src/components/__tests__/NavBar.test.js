import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import NavBar from '../NavBar'

import { CurrentUserProvider } from '../../contexts/CurrentUserContext';

test('Renders the NavBar and checks if all the links for logged out users are there', () => {
    render(
        <Router>
            <NavBar />
        </Router>
    );
    const homeLink = screen.getByRole('link', {name: 'Home'});
    const eventsLink = screen.getByRole('link', {name: 'Events'});
    const logInLink = screen.getByRole('link', {name: 'Log in'});
    expect(homeLink).toBeInTheDocument();
    expect(eventsLink).toBeInTheDocument();
    expect(logInLink).toBeInTheDocument();
});

test('Renders the NavBar and checks if all the links for logged in users are there', async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );
    const homeLink = await screen.findByRole('link', {name: 'Home'});
    const exploreLink = await screen.findByRole('link', {name: 'Explore'});
    const recommendationsLink = await screen.findByRole('link', {name: 'Recommendations'});
    const eventsLink = await screen.findByRole('link', {name: 'Events'});
    const likedLink = await screen.findByRole('link', {name: 'Liked'});
    const profileAvatar = await screen.findByText('Profile');
    const logOutLink = await screen.findByRole('link', {name: 'Log out'});
    
    expect(homeLink).toBeInTheDocument();
    expect(exploreLink).toBeInTheDocument();
    expect(recommendationsLink).toBeInTheDocument();
    expect(eventsLink).toBeInTheDocument();
    expect(likedLink).toBeInTheDocument();
    expect(profileAvatar).toBeInTheDocument();
    expect(logOutLink).toBeInTheDocument();
});

test('Renders the NavBar and checks if all the links for logged out users are there', async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );

    const signOutLink = await screen.findByRole('link', {name: 'Log out'});
    fireEvent.click(signOutLink);
    
    const homeLink = await screen.findByRole('link', {name: 'Home'});
    const logInLink = await screen.findByRole('link', {name: 'Log in'});
    const signUpLink = await screen.findByRole('link', {name: 'Sign up'});

    expect(homeLink).toBeInTheDocument();
    expect(logInLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
});