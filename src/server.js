import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import CONFIG from './environments/config.js';
import __dirname from './__dirname.js';
import handleErrorsMiddleware from './middlewares/handleErrors.middleware.js';
import {
      MongoManager
} from './models/manager/mongo.manager.js';
import cookieParser from 'cookie-parser';


import cors from 'cors';

import router from './router/app.routes.js';

const app = express();
const PORT = CONFIG.PORT;
const SECRET = CONFIG.SECRET;

MongoManager.start();

const allowedOrigins = ['http://localhost:5173', 'https://localhost:5173',
      'http://localhost:5173/#', 'https://localhost:5173/#',
      'https://valentinalvarez98.github.io', 'http://localhost:8080', 'http://localhost:3000', "https://pf-alvarez-react-firebase.vercel.app",
      "https://pfalvarez-production.up.railway.app",
      "https://pf-alvarez-react-firebase-a0g5qco1l-valentinalvarez98s-projects.vercel.app", "https://test-deploy-front-seven.vercel.app/#/", "https://test-deploy-front-seven.vercel.app", "https://test-deploy-front-seven.vercel.app/", "https://e-commerce-backend-example-production.up.railway.app/", "https://e-commerce-backend-example-production.up.railway.app/#/", "https://e-commerce-backend-example-production.up.railway.app", "https://test-deploy-front-inky.vercel.app/", "https://test-deploy-front-inky.vercel.app/#", "https://test-deploy-front-inky.vercel.app"
];

app.use(cors({
      origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                  const msg = 'The CORS policy for this site does not ' +
                        'allow access from the specified Origin.';
                  return callback(new Error(msg), false);
            }
            return callback(null, true);
      },
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
      methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({
      extended: true
}));

app.use(session({
      secret: SECRET,
      resave: false,
      saveUninitialized: false,
}));



app.use(express.static(__dirname + '/client/dist/assets'));
app.use(express.static(__dirname + '/client/dist'));
app.use('/', router);
app.get('*', (req, res) => {

      res.sendFile(__dirname + '/client/dist/index.html');

});

app.use(handleErrorsMiddleware);



app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
});