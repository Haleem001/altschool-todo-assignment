const assert = require('assert');
const { describe, it } = require('node:test');
const mongoose = require('mongoose');
const User = require('../models/User');
const Todo = require('../models/Todo');

describe('Model Tests', () => {
    describe('User Model', () => {
        it('should create user schema with required fields', () => {
            const user = new User({
                username: 'testuser',
                password: 'hashedpassword123'
            });

            assert.strictEqual(user.username, 'testuser');
            assert.strictEqual(user.password, 'hashedpassword123');
            assert.ok(user.createdAt);
        });

        it('should have todos array', () => {
            const user = new User({
                username: 'testuser',
                password: 'password'
            });

            assert.ok(Array.isArray(user.todos));
            assert.strictEqual(user.todos.length, 0);
        });
    });

    describe('Todo Model', () => {
        it('should create todo with required fields', () => {
            const userId = new mongoose.Types.ObjectId();
            const todo = new Todo({
                title: 'Test Todo',
                user: userId
            });

            assert.strictEqual(todo.title, 'Test Todo');
            assert.strictEqual(todo.status, 'pending');
            assert.strictEqual(todo.user.toString(), userId.toString());
        });

        it('should have pending as default status', () => {
            const todo = new Todo({
                title: 'Test',
                user: new mongoose.Types.ObjectId()
            });

            assert.strictEqual(todo.status, 'pending');
        });

        it('should accept valid status values', () => {
            const userId = new mongoose.Types.ObjectId();
            
            const todo1 = new Todo({ title: 'Test', user: userId, status: 'pending' });
            assert.strictEqual(todo1.status, 'pending');

            const todo2 = new Todo({ title: 'Test', user: userId, status: 'completed' });
            assert.strictEqual(todo2.status, 'completed');

            const todo3 = new Todo({ title: 'Test', user: userId, status: 'deleted' });
            assert.strictEqual(todo3.status, 'deleted');
        });
    });
});
