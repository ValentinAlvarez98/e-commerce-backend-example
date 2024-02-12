import DatabaseError from "../services/errors/databaseError.js";
import ValidationError from "../services/errors/validationError.js";

function handleErrorsMiddleware(err, req, res, next) {

      // Si el error es de base de datos
      if (err instanceof DatabaseError) {

            // Log del error para el servidor
            console.error(err.originalError);

            return res.status(err.statusCode).json({
                  status: "error",
                  message: err.message,
                  error: {
                        name: err.name,
                        statusCode: err.statusCode
                  }
            });
      }

      // Si el error es de validación
      if (err instanceof ValidationError) {

            // Log del error para el servidor
            console.error(err);

            return res.status(err.statusCode).json({
                  error: true,
                  message: err.message,
                  errors: err.errors,
            });

      }

      // Manejo de otros tipos de errores
      // ...

      // Si no se captura el error, se envía un error 500
      return res.status(500).json({

            error: true,
            message: "Internal Server Error"

      });

}

export default handleErrorsMiddleware;