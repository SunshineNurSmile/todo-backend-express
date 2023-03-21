import express from 'express';
const router = express.Router();
import * as TodoController from '../controllers/TodoController.js';
import * as TodoMiddleware from '../middlewares/TodoMiddleware.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';

router.use(AuthMiddleware);

router
  .route('/')
  .get(TodoController.getAllTodos)
  .post(TodoMiddleware.createTodoValidation, TodoController.createTodo)
  .put(TodoMiddleware.updateTodoValidation, TodoController.updateTodo)
  .patch(TodoMiddleware.todoIdValidation, TodoController.toggleStatus)
  .delete(TodoMiddleware.todoIdValidation, TodoController.deleteTodo);

export default router;
