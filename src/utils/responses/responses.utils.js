export const successResponse = (statusCode, message, data) => {
      return {
            success: true,
            status: "success",
            statusCode: statusCode,
            message: message,
            payload: data,
      }
}

export const errorResponse = (statusCode, message, error) => {

      return {
            error: true,
            status: "error",
            statusCode: statusCode,
            message: message,
            errors: error,
      }

}

export const HTTP_STATUS = {
      OK: 200,
      CREATED: 201,
      NO_CONTENT: 204,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      CONFLICT: 409,
      INTERNAL_SERVER_ERROR: 500
};