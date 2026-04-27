import express from 'express';
import { register } from '../services/userServices.js';
import { login } from '../services/userServices.js';


const routes = express.Router();

routes.post("/register", async (request, response) => {
    const { firstName, lastName, email, password, address } = request.body;
    const { statusCode, data } = await register({ firstName, lastName, email, password, address });
    response.status(statusCode).send(data);
});

routes.post("/login",async (request, response) => {
    const { email, password } = request.body;
    const { statusCode, data } = await login({ email, password });
    response.status(statusCode).send(data);
});
export default routes;
