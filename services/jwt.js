import jwt from "jwt-simple";
import dotenv from "dotenv";
import moment from "moment";

dotenv.config();

const secret = process.env.SECRET;

const createToken = (user) => {
    const payload ={
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    }

    return jwt.encode(payload, secret);
}

export default createToken;