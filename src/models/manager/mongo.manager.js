import mongoose from "mongoose";
import CONFIG from "../../environments/config.js";
import { sendErrorDBEmail } from "../../utils/mailing/mailing.utils.js";

export class MongoManager {

      static #instance;
      static #maxRetries = 5; 
      static #retryDelay = 2000;

      static async connectToDatabase(retries = this.#maxRetries, delay = this.#retryDelay) {

            const MONGO_URL = CONFIG.MONGO_URL;

            mongoose.set("strictQuery", false);

            try {

                  await mongoose.connect(MONGO_URL);

                  console.log("Base de datos MongoDB conectada");

            } catch (error) {

                  console.error("Error al conectar con la base de datos:", error);

                  if (retries > 0) {

                        console.log(`Reintentando conectar... Intentos restantes: ${retries}`);

                        setTimeout(() => this.connectToDatabase(retries - 1, delay), delay);

                        if (retries === 4) {

                              sendErrorDBEmail(
                                    "Error al conectar con la base de datos",
                                    `El error ha sido: ${error}. Actualmente se está ejecutando el segundo intento de reconexión. Intentos restantes: ${retries}.`,
                                    [`${CONFIG.MAIL.user}`]
                              );

                        }

                  } else {

                        console.log("Se han agotado los intentos de conexión. Por favor, verifique su configuración de conexión o la disponibilidad del servidor de MongoDB.");

                        sendErrorDBEmail(
                              "Error al conectar con la base de datos",
                              `El error ha sido: ${error}. Se han agotado los intentos de conexión. Por favor, verifique su configuración de conexión o la disponibilidad del servidor de MongoDB.`,
                              [`${CONFIG.MAIL.user}`, `${CONFIG.ADMIN.email}`]
                        );

                  }

            }

      }

      static start() {

            if (!this.#instance) {

                  this.#instance = this.connectToDatabase();

            } else {

                  console.log("La base de datos ya está conectada");

            }

      }

}