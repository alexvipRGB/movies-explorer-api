require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const crashTest = require('./routes/crashTest');
const router = require('./routes/index');
const validationErrors = require('./utils/validError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  cors({
    origin: [
      'http://localhost:3001',
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

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
