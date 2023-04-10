// Setup
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { logger } = require('./logger')
const app = express();
const PORT = process.env.SERVER_PORT || 4000;


// Routers
const empRouter = require('./routes/empRouter')

// Middlewares
var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}

app.use('/emp', cors(corsOptions), empRouter);
// Setup

app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
});
