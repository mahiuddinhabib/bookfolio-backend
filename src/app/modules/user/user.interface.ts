/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IBook } from '../book/book.interface';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IBookToRead = {
  book: Types.ObjectId | IBook;
  isFinished: boolean;
};

export type IUser = {
  name: UserName;
  email: string;
  password: string;
  wishList?: Types.ObjectId[] | IBook[];
  toRead?: IBookToRead[];
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<(Pick<IUser, 'email' | 'password'> & { _id: any }) | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
