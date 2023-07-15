import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { bookSearchableFields } from './book.constant';
import { IBook, IBookFilters, IBookReview } from './book.interface';
import { Book } from './book.model';

const createBook = async (payload: IBook): Promise<IBook> => {
  const result = (await Book.create(payload)).populate('owner');
  return result;
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const count = await Book.countDocuments();

  if (!paginationOptions.limit) paginationOptions.limit = count;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('owner');

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id).populate('owner');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>,
  user: JwtPayload | null
): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found !');
  }

  //checking the right owner
  if (user?._id !== isExist.owner.toString()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'This is not your book!');
  }

  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('owner');
  return result;
};

const deleteBook = async (
  id: string,
  user: JwtPayload | null
): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  //checking the right owner
  if (user?._id !== isExist.owner.toString()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'This is not your book!');
  }

  const result = await Book.findByIdAndDelete(id).populate('owner');
  return result;
};

const createReview = async (
  payload: IBookReview,
  bookId: string
): Promise<IBook | null> => {
  const { reviewer, review } = payload;
  const result = await Book.findByIdAndUpdate(
    bookId,
    { $push: { reviews: { reviewer, review } } },
    { new: true }
  ).populate('owner');
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  createReview,
};
