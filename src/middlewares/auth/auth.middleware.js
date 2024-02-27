import CONFIG from "../../environments/config.js";
import {
      verifyJWT
} from "../../utils/JWT/jwt.utils.js";

import AuthError from "../../services/errors/authorizationError.js";
import InvalidError from "../../services/errors/invalidError.js";

export const authMiddleware = (req, res, next) => {

      const authHeader = req.headers['authorization'];

      if (!authHeader) {

            throw new AuthError(["El header de autorización es requerido"]);
      }

      const token = authHeader.split(' ')[1];

      if (!token) {

            throw new AuthError(["El token es requerido"]);

      }

      const decoded = verifyJWT(token);

      if (!decoded) {
            throw new InvalidError(["El token no es valido"]);
      }



      req._id = decoded;

      next();


}