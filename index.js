// Setup
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.SERVER_PORT || 4000;
const logger = require('./logger');


// Routers
const empRouter = require('./routes/empRouter');

// Middlewares
var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}

app.use('/emp', cors(corsOptions), empRouter);
// app.use('/emp', empRouter);

// Setup

app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
});
