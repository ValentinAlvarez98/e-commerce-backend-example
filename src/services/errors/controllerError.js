class ControllerError extends Error {

      constructor(errors) {

            console.log(errors);

            super("Controller error");
            this.errors = errors;
            this.statusCode = 500;

      }

}

export default ControllerError;