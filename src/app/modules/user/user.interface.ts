/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  name: UserName;
  email: string;
  password: string;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<
    (Pick<IUser, 'email' | 'password'> & { _id: any }) | null
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
