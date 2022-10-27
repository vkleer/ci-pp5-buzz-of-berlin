import React, { useEffect, useState } from 'react';

import appStyles from '../App.module.css';

import Container from 'react-bootstrap/Container';

import Asset from '../components/Asset';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { axiosReq } from '../api/axiosDefaults';

/**
 * Renders the PopularProfile component - which displays the most followed
 * users on the app.
 * The variables and logic have been created using the Moments walkthrough
 * and have been built upon/customised.
 */
const PopularProfiles = ({ mobile }) => {
    const [profileData, setProfileData] = useState({
        pageProfile: { results: [] },
        popularProfiles: { results: [] },
    });
    const { popularProfiles } = profileData;
    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                "/profiles/?ordering=-followers_count"
                );
                setProfileData((prevState) => ({
                ...prevState,
                popularProfiles: data,
                }));
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [currentUser]);

    return (
        <Container
            className={`
                ${appStyles.Content} 
                ${appStyles.FlatBoxBorder} 
                ${mobile ? 
                    (
                        "d-lg-none text-center mb-4"
                    ) : (
                        "ml-4"
                    )
                }
            `}
        >
        {popularProfiles.results.length ? (
            <>
            <h4>The true Berliners:</h4>
            <hr />
            {mobile ? (
                <div className="d-flex justify-content-around">
                    {popularProfiles.results.slice(0, 4).map((profile) => (
                        <p key={profile.id}>{profile.owner}</p>
                    ))}
                </div>
            ) : (
                popularProfiles.results.map((profile) => (
                    <p key={profile.id}>{profile.owner}</p>
                ))
            )}
            </>
        ) : (
            <Asset spinner />
        )}
        </Container>
    );
};

export default PopularProfiles;