const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const port = process.env.PORT || 3000;

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/listings', require('./routes/listingRoutes'));
app.use('/api/feed', require('./routes/feedRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));

app.use(errorHandler);

app.listen(port, console.log(`Server Listening on port ${port}`));
