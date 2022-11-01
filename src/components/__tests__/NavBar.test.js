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
    const homeLink = await screen.findByText('Home');
    const exploreLink = await screen.findByText('Explore');
    const recommendationsLink = await screen.findByText('Recommendations');
    const EventsLink = await screen.findByText('Events');
    const LikedLink = await screen.findByText('Liked');
    const profileLink = await screen.findByText('Profile');
    const logOutLink = await screen.findByText('Log out');
    expect(homeLink).toBeInTheDocument();
    expect(exploreLink).toBeInTheDocument();
    expect(recommendationsLink).toBeInTheDocument();
    expect(EventsLink).toBeInTheDocument();
    expect(LikedLink).toBeInTheDocument();
    expect(profileLink).toBeInTheDocument();
    expect(logOutLink).toBeInTheDocument();
});

test('Renders the Log in and Sign up buttons after logging out', async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );

    const signOutLink = await screen.findByRole('link', {name: 'Log out'});
    fireEvent.click(signOutLink);

    const signInLink = await screen.findByRole('link', {name: 'Log in'});
    const signUpLink = await screen.findByRole('link', {name: 'Sign up'});

    expect(signInLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
});