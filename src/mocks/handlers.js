import { rest } from "msw";

const baseURL = 'https://buzz-of-berlin-drf-api.herokuapp.com/';

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json({
            pk: 5,
            username: "Lisa",
            email: "",
            first_name: "",
            last_name: "",
            profile_id: 5,
            profile_image: "https://res.cloudinary.com/reveredcheese/image/upload/v1/media/images/istockphoto-1412152702-170667a_gkwcof"
            }));
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    })
];
