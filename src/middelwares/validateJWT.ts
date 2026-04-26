import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export interface ExtenRequest extends Request {
    user?: any;
}

const validateJwt = (req: ExtenRequest, res: Response, next: NextFunction) => {
    const authorizationHeader = req.get("authorization");
    if (!authorizationHeader) {
        res.status(403).send("Authorization header was not provided");
        return;
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        res.status(403).send("Bearer token not found");
        return;
    }
    jwt.verify(token, "VN3RMTHlDvCn2PTzOyA+j+XNSoLDYdWnN17Thrio12w=", async (err, payload) => {
        if (err) {
            res.status(403).send("Invalid token");
            return;
        }
        if (!payload) {
            res.status(403).send("Invalid token payload");
            return;
        }
        const userPayload = payload as { email: string; firstName: string; lastName: string };

        const user = await userModel.findOne({ email: userPayload.email });
        req.user = user;
        next();

    });
}
export default validateJwt;