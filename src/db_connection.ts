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


export const dbAction = async (
    dbData: type.rdsSecret,
    query: string,
    requiredData?: [any],
    inputData?: any): Promise<type.dataResponse> => {
  let retData: type.dataResponse = {
    data: [],
    status: {
      status_code: 500,
      message: 'Internal Server Error',
    },
  };

  return new Promise((resolve) => {
    const conn = connect(dbData);
    conn.connect();

    if (requiredData !== undefined) {
      const missingData: string[] = requiredData;
      let containsAll = false;
      if (Object.keys(inputData).length > 0) {
        missingData.length = 0;
        const arrData = inputData;
        inputData = Object.values(inputData);
        containsAll = requiredData.every((element) => {
          if (!(element in arrData)) {
            console.log(element);
            missingData.push(element);
            return false;
          }
          return true;
        });
      }
      if (containsAll === false || Object.keys(inputData).length === 0) {
        retData.status.status_code = 400;
        retData.status.message = 'Missing keys: ' + missingData.join();
        return resolve(retData);
      }
    }

    conn.query(query, inputData)
        .then((response) => {
          retData = {
            data: response.rows,
            status: {
              status_code: 200,
              message: 'success',
            },
          };
          conn.end();
          return resolve(retData);
        })
        .catch((e) => {
          retData.status.message = e.message;
          conn.end();
          return resolve(retData);
        });
  });
};
