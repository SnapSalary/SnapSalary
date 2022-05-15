/* eslint-disable require-jsdoc */
import express, {Application} from 'express';
import {getRDSSecret} from './secrets';
import {initDBTables} from './db_connection';
import companyRoutes from './routes/companies.routes';

const app: Application = express();

const port = (process.env.PORT !== undefined) ? process.env.PORT : 3000;
console.log('Current working environment:', process.env.NODE_ENV);

app.use(companyRoutes);

app.listen(port, async (): Promise<void> => {
  await initDBTables(await getRDSSecret());
  // await test(await getRDSSecret());

  console.log(`Connected on port ${port}`);
});

export default app;
