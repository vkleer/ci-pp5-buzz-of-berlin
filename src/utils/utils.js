import { axiosReq } from "../api/axiosDefaults"

/**
 * Fetches paginated data so we don't have to click on the 'next' button.
 * The variables and logic have been created using the Moments walkthrough.
 */
export const fetchMoreData = async (resource, setResource) => {
    try {
        const {data} = await axiosReq.get(resource.next);
        setResource(prevResource => ({
            ...prevResource,
            next:data.next,
            results: data.results.reduce((acc, cur) => {
                return acc.some(accResult => accResult.id === cur.id) 
                ? acc 
                : [...acc, cur];
            }, prevResource.results)
        }));
    } catch(err) {}
};