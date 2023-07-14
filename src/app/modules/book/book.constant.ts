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

export const cowSearchableFields = ['location', 'breed', 'category'];

export const cowFilterableFields = [
  'searchTerm',
  'location',
  'minPrice',
  'maxPrice',
];
