const getTimestamp = () => {
    return new Date().toISOString();
};

const formatLog = (level, message, meta = {}) => {
    const logEntry = {
        timestamp: getTimestamp(),
        level: level.toUpperCase(),
        message,
        ...meta
    };
    return JSON.stringify(logEntry);
};

const logger = {
    info: (message, meta = {}) => {
        console.log(formatLog('info', message, meta));
    },
    warn: (message, meta = {}) => {
        console.warn(formatLog('warn', message, meta));
    },
    error: (message, meta = {}) => {
        console.error(formatLog('error', message, meta));
    },
    success: (message, meta = {}) => {
        console.log(formatLog('success', message, meta));
    }
};

module.exports = logger;
