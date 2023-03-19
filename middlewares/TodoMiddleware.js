import validator from 'validator';

const validateTitleAndDesc = (title, description) => {
  if (
    !title ||
    !description ||
    validator.isEmpty(title) ||
    validator.isEmpty(description)
  ) {
    return false;
  }
  return true;
};

const validateTodoId = (id) => {
  if (!validator.isMongoId(id)) {
    return false;
  }
  return true;
};

const createTodoValidation = (req, res, next) => {
  const { title, description } = req.body;

  if (!validateTitleAndDesc(title, description)) {
    return res.status(400).json({ message: 'Missing required fields!' });
  }

  req.body.title = validator.escape(title);
  req.body.description = validator.escape(description);

  next();
};

const updateTodoValidation = (req, res, next) => {
  const { todoId, title, description, status } = req.body;

  if (!validateTodoId(todoId)) {
    return res.status(400).json({ message: 'Invalid todo ID!' });
  }

  if (!validateTitleAndDesc(title, description)) {
    return res.status(400).json({ message: 'Missing required fields!' });
  }

  if (!typeof status === Boolean) {
    return res
      .status(400)
      .json({ message: 'Todo status must be either true or false' });
  }

  req.body.title = validator.escape(title);
  req.body.description = validator.escape(description);

  next();
};

const deleteTodoValidation = (req, res, next) => {
  const { todoId } = req.body;
  if (!validateTodoId(todoId)) {
    return res.status(400).json({ message: 'Invalid todo ID!' });
  }

  next();
};

export { createTodoValidation, updateTodoValidation, deleteTodoValidation };
