class InvalidError extends Error {

      constructor(errors) {

            console.log(errors);

            super("Access denied");
            this.errors = errors;
            this.statusCode = 403;

      }

}

export default InvalidError;