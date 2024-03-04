import dotenv from 'dotenv';
import params from './params.js';

const mode = params.mode;

dotenv.config({
      path: `../.env.${mode}`
});

const CONFIG = {
      API_URL: process.env.API_URL,
      PORT: process.env.PORT,
      MONGO_URL: process.env.MONGO_URL,
      MONGO_COLLECTIONS: {
            users: process.env.MONGO_COLLECTION_USERS,
            products: process.env.MONGO_COLLECTION_PRODUCTS,
      },
      SECRET: process.env.SECRET,
      KEY: process.env.KEY,
      ADMIN: {
            email: process.env.ADMIN_EMAIL,
      },
      ENV: mode,
      MAIL: {
            user: process.env.MAIL_USER,
            password: process.env.MAIL_PASS
      },
      MAIL_HOST: process.env.MAIL_HOST,
      REDIS: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD
      }
};

export default CONFIG;