const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

// Protect all routes
router.use(ensureAuthenticated);

// Dashboard / Todos
router.get('/', todoController.getTodos);

// Trash
router.get('/trash', todoController.getTrashed);

// Actions
router.post('/add', todoController.createTodo); // Changed to POST for creation
router.get('/complete/:id', todoController.toggleComplete);
router.get('/trash/:id', todoController.deleteTodo);
router.get('/restore/:id', todoController.restoreTodo);
router.get('/delete/:id', todoController.permanentDelete); // Permanent delete

module.exports = router;
