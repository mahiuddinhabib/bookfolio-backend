/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
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

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
