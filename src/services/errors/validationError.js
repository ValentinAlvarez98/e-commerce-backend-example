class ValidationError extends Error {

      constructor(errors) {

            console.log(errors);

            super("Validation error");
            this.errors = errors;
            this.statusCode = 400;

      }

}

export default ValidationError;