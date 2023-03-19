import express from 'express';
const router = express.Router();
import * as UserController from '../controllers/UserController.js';
import * as UserMiddleware from '../middlewares/UserMiddleware.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';

router.get('/verify', AuthMiddleware, UserController.verifyLogin);
router.post(
  '/create',
  UserMiddleware.createUserValidation,
  UserController.createUser,
);
router.post(
  '/login',
  UserMiddleware.loginUserValidation,
  UserController.loginUser,
);
router.get('/logout', AuthMiddleware, UserController.logoutUser);

export default router;
