import userModel from "../models/userModel.js";
export const register = async ({ firstName, lastName, email, password }) => {
    const findUser = await userModel.findOne({ email });
    if (findUser) {
        return { data: "User already exists", statusCode: 400 };
    }
    const newUser = new userModel({
        firstName,
        lastName,
        email,
        password
    });
    await newUser.save();
    return { data: newUser, statusCode: 200 };
};
export const login = async ({ email, password }) => {
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
        return { error: { message: "Incorrect email or password " } };
    }
    const passwordMatch = password === findUser.password;
    if (passwordMatch) {
        return findUser;
    }
    return { error: { message: "Incorrect email or password " } };
};
