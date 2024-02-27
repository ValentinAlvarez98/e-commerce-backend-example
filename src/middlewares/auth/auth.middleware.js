import CONFIG from "../../environments/config.js";
import {
      verifyJWT
} from "../../utils/JWT/jwt.utils.js";

export const authMiddleware = (req, res, next) => {

      const authHeader = req.headers['authorization'];

      if (!authHeader) {

            throw {
                  statusCode: 400,
                  message: "Error en la petición",
                  errors: ["El header de autenticación es requerido"],
            }

      }

      const token = authHeader.split(' ')[1];

      if (!token) {

            throw {
                  statusCode: 401,
                  message: "Error de autenticación",
                  errors: ["El token es requerido"],
            }

      }

      const decoded = verifyJWT(token);

      if (!decoded) {
            throw {
                  statusCode: 403,
                  message: "Acceso denegado",
                  errors: ["Token inválido"]
            }
      }



      req._id = decoded;

      next();


}