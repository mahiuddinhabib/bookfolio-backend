import { Schema, model } from 'mongoose';
import { bookGenre } from './book.constant';
import { BookModel, IBook, IBookReview } from './book.interface';

const reviewSchema = new Schema<IBookReview>({
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

export const BookSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: bookGenre,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    reviews: {
      type: [reviewSchema],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model<IBook, BookModel>('Book', BookSchema);
