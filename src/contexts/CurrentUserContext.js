import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { shouldRefreshToken, removeTokenTimestamp } from '../utils/utils';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

/**
 * Determines the logged-in status of users.
 * The variables and logic have been created using the Moments walkthrough
 * and have been built upon/customised.
 */
export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const history = useHistory();

    const handleMount = async () => {
        try {
            const { data } = await axiosRes.get('dj-rest-auth/user/');
            setCurrentUser(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleMount();
    }, []);

    useMemo(() => {
        axiosReq.interceptors.request.use(
            async (config) => {
                if (shouldRefreshToken()) {
                    try {
                        await axios.post('dj-rest-auth/token/refresh/')
                    } catch(err) {
                        setCurrentUser((prevCurrentUser) => {
                            if (prevCurrentUser) {
                                history.push('/signin');
                            }
                            return null;
                        });
                        removeTokenTimestamp();
                        return config;
                    }
                }
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );

        axiosRes.interceptors.response.use(
            (response) => response,
            async (err) => {
                if (err.response?.status === 401){
                    try {
                        await axios.post('/dj-rest-auth/token/refresh/')
                    } catch(err) {
                        setCurrentUser(prevCurrentUser => {
                            if (prevCurrentUser) {
                                history.push('/login');
                            }
                            return null
                        });
                        removeTokenTimestamp();
                    }
                    return axios(err.config);
                }
                return Promise.reject(err);
            }
        );
    }, [history]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                {children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    );
};