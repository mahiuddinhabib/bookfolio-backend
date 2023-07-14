import { IBook } from './book.interface';
import { Book } from './book.model';

const createBook = async (payload: IBook): Promise<IBook> => {
  const result = (await Book.create(payload)).populate('owner');
  return result;
};

/* 
const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
  ): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
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

  if (minPrice) {
    andConditions.push({ price: { $gte: minPrice } });
  }

  if (maxPrice) {
    andConditions.push({ price: { $lte: maxPrice } });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('seller');

  const count = await Cow.countDocuments();

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate('seller');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found');
  }
  return result;
};

const updateCow = async (
  id: string,
  payload: Partial<ICow>,
  token: string
): Promise<ICow | null> => {
  const isExist = await Cow.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found !');
  }

  //checking the right seller
  const verifiedUser = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );

  if (verifiedUser._id !== isExist.seller.toString()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'This is not your cow!');
  }

  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('seller');
  return result;
};

const deleteCow = async (id: string, token: string): Promise<ICow | null> => {
  const isExist = await Cow.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found');
  }

  //checking the right seller
  const verifiedUser = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );

  if (verifiedUser._id !== isExist.seller.toString()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'This is not your cow!');
  }

  const result = await Cow.findByIdAndDelete(id).populate('seller');
  return result;
};
 */
export const BookService = {
  createBook,
  // getAllCows,
  // getSingleCow,
  // updateCow,
  // deleteCow,
};
