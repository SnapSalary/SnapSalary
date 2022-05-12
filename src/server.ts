import express, {Application} from 'express';
// import "dotenv/config";
// import cors from "cors";
import {getRDSSecret} from './secrets';
import {initDBTables} from './db_connection';
// import { test } from "./db_connection";
import routes from './routes';

async function main() {
  const app: Application = express();

  const port = 3000;

  app.use(routes);

  /*
	const server = await app.listen(port, () => {
		console.log("Server is running");
	});
	*/

  app.listen(port, async (): Promise<void> => {
    await initDBTables(await getRDSSecret());
    // await test(await getRDSSecret());

    console.log(`Connected on port ${port}`);
  });
}

main();
