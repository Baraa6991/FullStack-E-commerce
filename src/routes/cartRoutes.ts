import express from 'express';
import { getActiveCartForUser } from '../services/cartServices.js';
import validateJwt from '../middelwares/validateJWT.js';
import { ExtenRequest } from '../middelwares/validateJWT.js';



const routes = express.Router();

routes.get("/",validateJwt, async (req: ExtenRequest, res: express.Response) => {
    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
})

export default routes;