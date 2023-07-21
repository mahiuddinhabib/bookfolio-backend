/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IBookToRead, IUser, UserModel } from './user.interface';

const toReadSchema = new Schema<IBookToRead>({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
    unique: true,
  },
  isFinished: {
    type: Boolean,
    required: true,
  },
});

export const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    wishList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        unique: true,
      },
    ],
    toRead: {
      type: [toReadSchema],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.isUserExist = async function (
  email: string
): Promise<(Pick<IUser, 'email' | 'password'> & { _id: any }) | null> {
  return await User.findOne({ email }, { _id: 1, email: 1, password: 1 });
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
