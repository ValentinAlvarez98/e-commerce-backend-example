import jwt from "jsonwebtoken";
import CONFIG from "../../environments/config.js";

const key = CONFIG.KEY;

export const generateJWT = (_id) => {

      const token = jwt.sign({
            _id
      }, key, {
            expiresIn: '12h'
      })
      return token;

}

export const verifyJWT = (token) => {

      const decoded = jwt.verify(token, key);
      return decoded;

}