import { object, string, number, TypeOf } from 'zod';

const payload = {
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    description: string({ required_error: 'Description is required' }).min(
      120,
      'Description should be atleast 120 characters long.',
    ),
    price: number({
      required_error: 'Price is required',
    }),
    image: string({
      required_error: 'Image is required',
    }),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: 'ProductId is required',
    }),
  }),
};

export const createProductsSchema = object({
  ...payload,
});

export const updateProductsSchema = object({
  ...payload,
  ...params,
});

export const deleteProductsSchema = object({
  ...params,
});

export const getProductsSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductsSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductsSchema>;
export type ReadProductInput = TypeOf<typeof getProductsSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductsSchema>;
