class AuthError extends Error {

      constructor(errors) {

            console.log(errors);

            super("Authorization error");
            this.errors = errors;
            this.statusCode = 401;

      }

}

export default AuthError;