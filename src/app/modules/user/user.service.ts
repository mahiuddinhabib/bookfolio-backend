/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBook } from '../book/book.interface';
import { IBookToRead, IUser } from './user.interface';
import { User } from './user.model';

const getAllUsers = async (): Promise<IUser[] | []> => {
  const result = await User.find({});
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const { name, ...userData } = payload;

  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>; // `name.firstName`
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await User.findByIdAndDelete(id);
  return result;
};

const addToWishList = async (
  userId: string,
  bookId: string
): Promise<IBook[] | null> => {
  const result = await User.findByIdAndUpdate(
    userId,
    { $push: { wishList: bookId } },
    { new: true }
  ).populate('wishList');

  const wishList = result?.wishList as IBook[];
  return wishList;
};

const getWishlist = async (userId: string): Promise<IBook[] | null> => {
  const result = await User.findById(userId).populate('wishList');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const wishList = result?.wishList as IBook[];
  return wishList;
};

const addToRead = async (
  userId: string,
  bookId: string
): Promise<IBookToRead[] | undefined> => {
  const result = await User.findByIdAndUpdate(
    userId,
    { $push: { toRead: { book: bookId, isFinished: false } } },
    { new: true }
  );
  const toRead = result?.toRead;
  return toRead;
};

const updateIsFinished = async (
  userId: string,
  bookId: string
): Promise<IBookToRead | undefined> => {
  const isExist = await User.findOne({ _id: userId });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: userId,
      toRead: { $elemMatch: { book: bookId } },
    },
    { $set: { 'toRead.$.isFinished': true } },
    {
      new: true,
    }
  );

  const toReadItem = updatedUser?.toRead?.find(
    item => item.book.toString() === bookId
  );
  return toReadItem;
};

const getToRead = async (
  userId: string
): Promise<IBookToRead[] | undefined> => {
  const result = await User.findById(userId).populate('toRead.book');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const toRead = result?.toRead;
  return toRead;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addToWishList,
  addToRead,
  getWishlist,
  getToRead,
  updateIsFinished,
};
