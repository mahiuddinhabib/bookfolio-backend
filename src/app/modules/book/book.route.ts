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

router.get('/', BookController.getAllBooks);

router.get('/:id', auth(), BookController.getSingleBook);

/*
router.patch(
  '/:id',
  auth(USER_ROLE.SELLER),
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook
);

router.delete('/:id',
auth(USER_ROLE.SELLER),
BookController.deleteBook);

*/
export const BookRoutes = router;
