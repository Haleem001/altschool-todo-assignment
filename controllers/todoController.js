const Todo = require('../models/Todo');
const User = require('../models/User');

// Get all todos for the current user
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user._id, status: { $ne: 'deleted' } }).sort({ createdAt: -1 });
        res.render('index', {
            todos: todos,
            user: req.user,
            title: 'Todo List'
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Server Error' });
    }
};

// Create a new todo
exports.createTodo = async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,
            user: req.user._id
        });

        const savedTodo = await todo.save();

        await User.findByIdAndUpdate(req.user._id, {
            $push: { todos: savedTodo._id }
        });

        req.flash('success_msg', 'Task added successfully!');
        res.redirect('/');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Failed to add task. Please try again.');
        res.redirect('/');
    }
};

// Update a todo (toggle completed status)
exports.toggleComplete = async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todo.status = todo.status === 'completed' ? 'pending' : 'completed';
        await todo.save();

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Delete a todo (chnge status to deleted
exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { status: 'deleted' }
        );

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Get trashed todos
exports.getTrashed = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user._id, status: 'deleted' }).sort({ createdAt: -1 });
        res.render('trash', {
            todos: todos,
            user: req.user,
            title: 'Trash'
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Server Error' });
    }
};

// Restore from trash
exports.restoreTodo = async (req, res) => {
    try {
        await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { status: 'pending' }
        );
        res.redirect('/trash');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Permanent deletion from trash
exports.permanentDelete = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete(
            { _id: req.params.id, user: req.user._id }
        );

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Remove from user's todos array
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { todos: req.params.id }
        });

        res.redirect('/trash');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};