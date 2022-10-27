/**
 * Renders the PopularProfile component - which displays the most followed
 * users on the app.
 * The variables and logic have been created using the Moments walkthrough
 * and have been built upon/customised.
 */

 import React from 'react';
 import appStyles from '../App.module.css';
 import { Container } from 'react-bootstrap';
 import Asset from '../components/Asset';
 import Profile from './Profile';
 import { useProfileData } from '../contexts/ProfileDataContext';
 
 const PopularProfiles = ({ mobile }) => {
     const { popularProfiles } = useProfileData();
 
   return (
        <Container className={
                `${appStyles.Content} 
                ${mobile ? 
                (
                    "d-xl-none text-center mb-4"
                ) : (
                    "ml-4"
                )
            }`
        }>
            {popularProfiles.results.length ? (
                <>
                    <h4>The true Berliners:</h4>
                    <hr />
                    {mobile ? (
                        <div className='d-flex justify-content-around'>
                            {popularProfiles.results.slice(0, 4).map(profile => (
                                <Profile key={profile.id} profile={profile} mobile />
                            ))}
                        </div>
                    ) : (
                        popularProfiles.results.map(profile => (
                            <Profile key={profile.id} profile={profile} />
                        ))
                    )}
                </>
             ) : (
                <Asset spinner />
             )}
         </Container>
     );
 };
 
 export default PopularProfiles