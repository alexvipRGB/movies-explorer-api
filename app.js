require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const validationErrors = require('./utils/validError');
const { APP_PORT, MONGO_DB, MONGO_OPTIONS } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connect(MONGO_DB, MONGO_OPTIONS);

app.use(
  cors({
    origin: [
      'http://localhost:3001',
      'http://alpetrov.dip.nomoredomains.work',
      'https://alpetrov.dip.nomoredomains.work',
      'http://api.alpetrov.dip.nomoredomains.work',
      'https://api.alpetrov.dip.nomoredomains.work',
    ],
    credentials: true,
    maxAge: 60,
  }),
);

app.use(helmet());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(bodyParser.json());
app.use(router);
app.use(errorLogger);

app.use(validationErrors);
app.use(errors());

app.listen(APP_PORT, () => console.log(`App started on the port ${APP_PORT}`));
