import express from 'express';
import { addItemToCart, getActiveCartForUser } from '../services/cartServices.js';
import validateJwt from '../middelwares/validateJWT.js';
import { ExtenRequest } from '../middelwares/validateJWT.js';



const routes = express.Router();

routes.get("/",validateJwt, async (req: ExtenRequest, res: express.Response) => {
    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
})

routes.post("/items",validateJwt,async(req:ExtenRequest,res:express.Response)=>{
     const userId = req.user._id;
     const { productId, quantity } = req.body;
     const response= await addItemToCart({userId,productId,quantity});
     res.status(response.statusCode).send(response.data);
})

export default routes;