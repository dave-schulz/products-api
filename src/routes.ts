import { createSessionSchema } from './schema/sessions.schema';
import { createUserSchema } from './schema/user.schema';
import { Express, Request, Response } from 'express';
import { createUserHandler } from './controller/user.controller';
import validate from './middleware/validateResource';
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from './controller/session.controller';
import requireUser from './middleware/requireUser';
import {
  createProductsSchema,
  deleteProductsSchema,
  getProductsSchema,
  updateProductsSchema,
} from './schema/product.schema';
import {
  createProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from './controller/product.controller';

function routes(app: Express) {
  app.get('/healthchech', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post('/api/users', validate(createUserSchema), createUserHandler);

  app.post(
    '/api/sessions',
    validate(createSessionSchema),
    createUserSessionHandler,
  );

  app.get('/api/sessions/', requireUser, getUserSessionsHandler);
  app.delete('/api/sessions/', requireUser, deleteSessionHandler);

  app.post(
    '/api/products',
    // [requireUser, validate(createProductsSchema)],
    validate(createProductsSchema),
    createProductHandler,
  );
  app.put(
    '/api/products/:productId',
    [requireUser, validate(updateProductsSchema)],
    updateProductHandler,
  );

  app.get(
    '/api/products/:productId',
    validate(getProductsSchema),
    getProductHandler,
  );

  app.delete(
    '/api/products/:productId',
    [requireUser, validate(deleteProductsSchema)],
    deleteProductHandler,
  );
}

export default routes;
