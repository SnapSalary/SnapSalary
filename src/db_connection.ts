import {Client} from 'pg';
import * as type from './types';

export const initDBTables = async (dbData: type.rdsSecret): Promise<void> => {
  const conn = connect(dbData);
  await conn.connect();

  await conn.query(`
    CREATE TABLE IF NOT EXISTS companies (
    company_id serial PRIMARY KEY,
    company_name VARCHAR (100) UNIQUE NOT NULL);`)
      .then(() => console.log('Successfully initialized DB'))
      .catch((e) => console.log(e));

  await conn.end();
};

export const connect = (
    dbData: type.rdsSecret): Client => {
  const conn = new Client({
    user: dbData.username,
    password: dbData.password,
    host: dbData.host,
    database: 'snapsalary',
    port: 5432,
  });
  return conn;
};
