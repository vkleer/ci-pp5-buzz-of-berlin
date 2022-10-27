import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react";
import axios from "axios";

/**
 * Redirects users based on their loggedIn/Out status.
 * The variables and logic have been created using the Moments walkthrough.
 */
export const useRedirect = (userAuthStatus) => {
    const history = useHistory();

    useEffect(() => {
        const handleMount =  async () => {
            try {
                await axios.post('/dj-rest-auth/token/refresh/');
                if (userAuthStatus === 'loggedIn') {
                    history.push('/');
                }
            } catch(err) {
                if (userAuthStatus === 'loggedOut') {
                    history.push('/');
                }
            }
        }

        handleMount();
    }, [history, userAuthStatus]);
};