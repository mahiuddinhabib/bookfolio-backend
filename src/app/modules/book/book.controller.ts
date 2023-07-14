import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
// import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
// import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
// import { cowFilterableFields } from './cow.constant';
// import { ICow } from './book.interface';
import { BookService } from './book.service';
import { IBook } from './book.interface';

const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const book = req.body;
    const result = await BookService.createBook(book);

    sendResponse<IBook>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Book created successfully',
      data: result,
    });
  }
);

/*
const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CowService.getAllCows(filters, paginationOptions);

  sendResponse<ICow[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cows retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowService.getSingleCow(id);

  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow retrieved successfully',
    data: result,
  });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const updatedData = req.body;

  const result = await CowService.updateCow(id, updatedData, token as string);

  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow updated successfully',
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const result = await CowService.deleteCow(id, token as string);

  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow deleted successfully',
    data: result,
  });
});
*/
export const BookController = {
  createBook,
  // getAllCows,
  // getSingleCow,
  // updateCow,
  // deleteCow,
};
