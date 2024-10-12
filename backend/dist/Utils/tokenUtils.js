import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const hashKey = process.env.JWT_CLIENT_SECRET || "NEWHASH#12";
// Define a type for the return value of the createToken function
// Update the createToken function to specify the types
export const getToken = async (userDetails) => {
    try {
        // Generating the access token with a 10-minute expiry time
        const accessToken = jwt.sign(userDetails, hashKey, { expiresIn: "10m" });
        // Generating the refresh token with a 15-minute expiry time
        const refreshToken = jwt.sign(userDetails, hashKey, { expiresIn: "15m" });
        // Return both tokens as an object
        return { accessToken, refreshToken };
    }
    catch (error) {
        console.error(error);
        return {
            accessToken: 'null',
            refreshToken: 'null',
        };
    }
};
export const verifyToken = async (cookie) => {
    try {
        const tokenDetails = jwt.verify(cookie.accessToken, hashKey);
        debugger;
    }
    catch (error) { }
};
