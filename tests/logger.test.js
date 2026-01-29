const assert = require('assert');
const { describe, it } = require('node:test');
const logger = require('../utils/logger');

describe('Logger Tests', () => {
    it('should have info method', () => {
        assert.strictEqual(typeof logger.info, 'function');
    });

    it('should have error method', () => {
        assert.strictEqual(typeof logger.error, 'function');
    });

    it('should have warn method', () => {
        assert.strictEqual(typeof logger.warn, 'function');
    });

    it('should have success method', () => {
        assert.strictEqual(typeof logger.success, 'function');
    });

    it('should not throw error when logging info', () => {
        assert.doesNotThrow(() => {
            logger.info('Test message', { test: true });
        });
    });

    it('should not throw error when logging error', () => {
        assert.doesNotThrow(() => {
            logger.error('Test error', { error: 'test' });
        });
    });
});
