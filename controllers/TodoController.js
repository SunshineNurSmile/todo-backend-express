import Todo from '../models/Todo.js';
import User from '../models/User.js';

const createTodo = async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Cannot find user!' });
    }

    const newTodo = await Todo.create({
      title,
      description,
    });

    if (!user.todos) {
      user.todos = [];
    }
    user.todos.push(newTodo._id);
    await user.save();

    res.status(200).json({ message: 'Todo created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating todo!' });
  }
};

const getAllTodos = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId)
      .select('todos')
      .populate('todos')
      .lean()
      .exec();

    if (!user) {
      return res.status(404).json({ message: 'Cannot find user!' });
    }

    res.status(200).json(user.todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting todos!' });
  }
};

const updateTodo = async (req, res) => {
  const { todoId, title, description, status } = req.body;
  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found!' });
    }

    todo.title = title;
    todo.description = description;
    todo.status = status;

    await todo.save();

    res.status(200).json({ message: 'Todo updated!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating todo!' });
  }
};

const toggleStatus = async (req, res) => {
  const { todoId } = req.body;

  try {
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ message: 'Cannot find todo!' });
    }

    todo.status = !todo.status;

    await todo.save();

    res.status(200).json({ message: 'Todo status updated successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating todo status!' });
  }
};

const deleteTodo = async (req, res) => {
  const { todoId, userId } = req.body;
  try {
    await Todo.findByIdAndDelete(todoId);
    const user = await User.findById(userId);
    const filteredTodos = user.todos.filter((todo) => {
      return todo._id != todoId;
    });
    user.todos = filteredTodos;
    await user.save();
    res.status(200).json({ message: 'Todo deleted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting todo!' });
  }
};

export { createTodo, getAllTodos, updateTodo, toggleStatus, deleteTodo };
