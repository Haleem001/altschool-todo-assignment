const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    logger.error('Error occurred', {
        message: err.message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method
    });
    res.status(500).render('error', { error: 'Something went wrong!' });
};

module.exports = errorHandler;
