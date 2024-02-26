import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import CONFIG from './environments/config.js';
import __dirname from './__dirname.js';
import handleErrorsMiddleware from './middlewares/handleErrors.middleware.js';
import {
      MongoManager
} from './models/manager/mongo.manager.js';

import router from './router/app.routes.js';

const app = express();
const PORT = CONFIG.PORT;
const SECRET = CONFIG.SECRET;

MongoManager.start();

app.use(express.json());
app.use(express.urlencoded({
      extended: true
}));

app.use(session({
      secret: SECRET,
      resave: false,
      saveUninitialized: false,
}));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/client/dist'));
app.use('/', router);
app.get('*', (req, res) => {

      res.sendFile(__dirname + '/client/dist/index.html');

});

app.use(handleErrorsMiddleware);

app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
});