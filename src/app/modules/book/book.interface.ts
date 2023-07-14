import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IBookReview = {
  reviewer: Types.ObjectId | IUser;
  review: string;
};

export type IBookGenre =
  | 'mystery'
  | 'fantasy'
  | 'self-help'
  | 'biography'
  | 'thriller'
  | 'romance'
  | 'history'
  | 'fiction';

export type IBook = {
  title: string;
  author: string;
  genre: IBookGenre;
  publicationDate: string;
  reviews?: IBookReview[];
  owner: Types.ObjectId | IUser;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

/* export type IBookFilters = {
  searchTerm?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
};
 */
