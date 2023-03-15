import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import config from 'config';
import cors from 'cors';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';

const port = config.get<number>('port');

const app = express();
app.use(express.json());
app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`The Server is listening on port: ${port}`);
  await connect();
  routes(app);
});
