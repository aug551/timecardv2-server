// Setup
require('dotenv').config()
const express = require('express');
const { logger } = require('./logs')
const app = express();
const PORT = process.env.SERVER_PORT || 4000;

// Routers
const empRouter = require('./routes/empRouter')

// Middlewares
app.use('/emp', empRouter);

// Setup

app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
});
