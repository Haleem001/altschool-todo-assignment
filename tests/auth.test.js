const assert = require('assert');
const { describe, it } = require('node:test');
const bcrypt = require('bcryptjs');

describe('Password Hashing Tests', () => {
    it('should hash password successfully', async () => {
        const password = 'testpassword123';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        assert.ok(hashedPassword);
        assert.notStrictEqual(hashedPassword, password);
        assert.ok(hashedPassword.startsWith('$2a$') || hashedPassword.startsWith('$2b$'));
    });

    it('should compare password correctly - matching passwords', async () => {
        const password = 'mySecurePassword';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const isMatch = await bcrypt.compare(password, hashedPassword);
        assert.strictEqual(isMatch, true);
    });

    it('should compare password correctly - non-matching passwords', async () => {
        const password = 'mySecurePassword';
        const wrongPassword = 'wrongPassword';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const isMatch = await bcrypt.compare(wrongPassword, hashedPassword);
        assert.strictEqual(isMatch, false);
    });

    it('should generate different hashes for same password', async () => {
        const password = 'samePassword';
        const salt1 = await bcrypt.genSalt(10);
        const salt2 = await bcrypt.genSalt(10);
        const hash1 = await bcrypt.hash(password, salt1);
        const hash2 = await bcrypt.hash(password, salt2);

        assert.notStrictEqual(hash1, hash2);
    });
});
