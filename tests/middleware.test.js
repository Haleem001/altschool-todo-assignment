const assert = require('assert');
const { describe, it } = require('node:test');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

describe('Auth Middleware Tests', () => {
    it('should call next() when user is authenticated', () => {
        let nextCalled = false;
        
        const req = {
            isAuthenticated: () => true
        };
        const res = {};
        const next = () => {
            nextCalled = true;
        };

        ensureAuthenticated(req, res, next);
        assert.strictEqual(nextCalled, true);
    });

    it('should redirect to login when user is not authenticated', () => {
        let redirectUrl = null;
        let nextCalled = false;

        const req = {
            isAuthenticated: () => false
        };
        const res = {
            redirect: (url) => {
                redirectUrl = url;
            }
        };
        const next = () => {
            nextCalled = true;
        };

        ensureAuthenticated(req, res, next);
        assert.strictEqual(redirectUrl, '/auth/login');
        assert.strictEqual(nextCalled, false);
    });
});
