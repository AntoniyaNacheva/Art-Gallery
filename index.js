const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

mongoose.set('strictQuery', false);

const { PORT } = require('./config/env');
const routes = require('./routes');
const { dbInit } = require('./config/db');
const { auth } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorHandlerMiddleware');

const app = express();

app.engine('hbs', hbs.engine({
	extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
// Parse data from the form to req.body

app.use(express.static('public'));
app.use(cookieParser());
app.use(auth);
app.use(routes);
app.use(errorHandler);

dbInit();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));