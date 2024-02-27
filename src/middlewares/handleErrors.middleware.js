import DatabaseError from "../services/errors/databaseError.js";
import ValidationError from "../services/errors/validationError.js";
import AuthError from "../services/errors/authorizationError.js";
import InvalidError from "../services/errors/invalidError.js";

import {
      errorResponse,
      HTTP_STATUS
} from "../utils/responses/responses.utils.js";

function handleErrorsMiddleware(err, req, res, next) {

      // Si el error es de base de datos
      if (err instanceof DatabaseError) {

            // Log del error para el servidor
            console.error(err.originalError);

            // Utiliza errorResponse para formatear la respuesta
            const formattedResponse = errorResponse(err.statusCode, err.message, {
                  name: err.name,
                  statusCode: err.statusCode
            });

            return res.status(err.statusCode).json(formattedResponse);
      }

      // Si el error es de validación
      if (err instanceof ValidationError) {

            // Log del error para el servidor
            console.error(err);

            // Utiliza errorResponse para formatear la respuesta
            const formattedResponse = errorResponse(err.statusCode, err.message, err.errors);

            return res.status(err.statusCode).json(formattedResponse);

      }

      if (err instanceof AuthError) {

            // Log del error para el servidor
            console.error(err);

            // Utiliza errorResponse para formatear la respuesta
            const formattedResponse = errorResponse(err.statusCode, err.message, err.errors);

            return res.status(err.statusCode).json(formattedResponse);

      }

      if (err instanceof InvalidError) {

            // Log del error para el servidor
            console.error(err);

            // Utiliza errorResponse para formatear la respuesta
            const formattedResponse = errorResponse(err.statusCode, err.message, err.errors);

            return res.status(err.statusCode).json(formattedResponse);

      }

      // Manejo de otros tipos de errores

      // Si no se captura el error, se envía un error 500 usando errorResponse
      const formattedResponse = errorResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error", {
            message: "Error no capturado",
            errors: err ? err : "No se ha recibido un mensaje en el error"
      });

      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(formattedResponse);
}

export default handleErrorsMiddleware;