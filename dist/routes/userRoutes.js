import express from 'express';
import { register } from '../services/userServices.js';
const routes = express.Router();
routes.post("/register", async (request, response) => {
    const { firstName, lastName, email, password } = request.body;
    const { statusCode, data } = await register({ firstName, lastName, email, password });
    response.status(statusCode).send(data);
});
export default routes;
