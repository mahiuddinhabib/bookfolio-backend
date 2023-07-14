 import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';
const router = express.Router();

router.post(
  '/',
  auth(),
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
);

router.get(
  '/',
  BookController.getAllBooks
  );

/*
router.get(
  '/:id',
  auth(USER_ROLE.BUYER, USER_ROLE.SELLER, USER_ROLE.ADMIN),
  CowController.getSingleCow
);

router.patch(
  '/:id',
  auth(USER_ROLE.SELLER),
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow
);

router.delete('/:id',
auth(USER_ROLE.SELLER),
CowController.deleteCow);

*/
export const BookRoutes = router;