import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router.get('/:id', UserController.getSingleUser);

router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);

router.delete('/:id', UserController.deleteUser);

router.get('/', UserController.getAllUsers);

router.post(
  '/wish-list',
  auth(),
  validateRequest(UserValidation.addToWishListZodSchema),
  UserController.addToWishList
);

router.post(
  '/to-read',
  auth(),
  validateRequest(UserValidation.addToReadZodSchema),
  UserController.addToRead
);

export const UserRoutes = router;
