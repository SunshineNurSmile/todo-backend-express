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
  .patch(TodoMiddleware.updateTodoValidation, TodoController.updateTodo)
  .delete(TodoMiddleware.deleteTodoValidation, TodoController.deleteTodo);

export default router;
