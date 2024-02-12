class DatabaseError extends Error {

      constructor(message, error) {

            console.error(error); // Se imprime el error original en la consola

            super(message);
            this.name = "DatabaseError";
            this.originalError = error; // Se conserva el error original
            this.statusCode = 500; // Se trata de un error interno del servidor

      }

}

export default DatabaseError;