import jwt from "jwt-simple";
import dotenv from "dotenv";
import moment from "moment";

dotenv.config();

const secret = process.env.SECRET;

const auth = (req, res, next) => {

    if (!req.headers.authorization) return res.status(404).json({status: "Error", message: "Authorization token needed"});

    let token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        let payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()) {
            return res.status(401).json({
                status: "Error",
                message: "Token expired"
            })
        }

        req.user = payload;
    } catch (error) {
        return res.status(401).json({
            status: "Error",
            message: "Invalid token"
        })
    }

    next();
}

export default auth;