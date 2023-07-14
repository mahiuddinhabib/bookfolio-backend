import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { bookSearchableFields } from './book.constant';
import { IBook, IBookFilters } from './book.interface';
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

  const count = await Book.countDocuments();

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

/* 
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id).populate('seller');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>,
  token: string
): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found !');
  }

  //checking the right seller
  const verifiedUser = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );

  if (verifiedUser._id !== isExist.seller.toString()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'This is not your cow!');
  }

  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('seller');
  return result;
};

const deleteBook = async (id: string, token: string): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  //checking the right seller
  const verifiedUser = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );

  if (verifiedUser._id !== isExist.seller.toString()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'This is not your cow!');
  }

  const result = await Book.findByIdAndDelete(id).populate('seller');
  return result;
};
 */
export const BookService = {
  createBook,
  getAllBooks,
  // getSingleBook,
  // updateBook,
  // deleteBook,
};
