import { IBookGenre } from './book.interface';

export const bookGenre: IBookGenre[] = [
  'mystery',
  'fantasy',
  'self-help',
  'biography',
  'thriller',
  'romance',
  'history',
  'fiction',
];

export const bookSearchableFields = ['title', 'author', 'genre'];

export const bookFilterableFields = [
  'searchTerm',
  'genre',
  'publicationDate',
];
