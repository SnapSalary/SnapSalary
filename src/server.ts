import express, {Application} from 'express';
import {getRDSSecret} from './secrets';
import {initDBTables} from './db_connection';
import routes from './routes';

const app: Application = express();

const port = 3000;

app.use(routes);

app.listen(port, async (): Promise<void> => {
  await initDBTables(await getRDSSecret());

  console.log(`Connected on port ${port}`);
});
