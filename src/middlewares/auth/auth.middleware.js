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

      try {

            const decoded = verifyJWT(token);

            req._id = decoded;

            next();

      } catch (error) {
            throw new InvalidError(["El token no es valido"]);
      }


}

export const authFromCookieMiddleware = (req, res, next) => {

      try {

            const token = req.cookies.token;

            if (!token) {

                  throw new AuthError(["No se ha encontrado el token en las cookies"]);


            }

            req.token = token;



            const decoded = verifyJWT(token);

            if (!decoded) {
                  throw new InvalidError(["El token no es valido"]);

            }

            req._id = decoded;

            req.token = token;

            next();

      } catch (error) {
            throw new AuthError(["No se ha podido verificar el token"]);
      }



}