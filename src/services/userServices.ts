import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface RegisterParame {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address:string;
}

export const register = async ({ firstName, lastName, email, password,address }: RegisterParame) => {
    const findUser = await userModel.findOne({ email });
    if (findUser) {
        return { data: "User already exists", statusCode: 400 }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        address
    });
    await newUser.save();
    return { data: generatoJWT({ firstName, lastName, email }), statusCode: 200 };
}

interface LoginParams {
    email: string;
    password: string;
}

export const login = async ({ email, password }: LoginParams) => {
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
        return { data: "User not found", statusCode: 404 }
    }
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (passwordMatch) {
        return ({ data: generatoJWT({ email, firstName: findUser.firstName, lastName: findUser.lastName }), statusCode: 200 });
    }
    return { data: "Incorrect email or password", statusCode: 400 }
}

const generatoJWT = (data: any) => {
    return jwt.sign(data, "VN3RMTHlDvCn2PTzOyA+j+XNSoLDYdWnN17Thrio12w=");
}
