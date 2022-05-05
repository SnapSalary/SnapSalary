import express, {Router, Request, Response} from 'express';
import {connect} from './db_connection';
import {getRDSSecret} from './secrets';
import {dataResponse} from './types';
const router = Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/get_companies_directory', async (
    _req: Request,
    res: Response): Promise<Response> => {
  const conn = connect(await getRDSSecret());
  await conn.connect();

  const resp = await conn.query('SELECT * FROM companies;');

  await conn.end();

  return res.status(200).send({
    data: resp.rows,
    status: {
      status_code: 200,
      message: 'Success',
    },
  });
});

router.post('/insert_company', async (
    req: Request,
    res: Response): Promise<Response> => {
  let data: dataResponse = {
    data: [],
    status: {
      status_code: 500,
      message: 'Internal Server Error',
    },
  };

  if (req.body.company !== undefined) {
    const conn = connect(await getRDSSecret());
    await conn.connect();
    await conn.query(`
      INSERT INTO 
      companies (company_name) 
      VALUES 
      ($1) RETURNING company_id;`, [req.body.company])
        .then((response) => {
          data = {
            data: response.rows,
            status: {
              status_code: 200,
              message: 'success',
            },
          };
        })
        .catch((e) => {
          data.status.message = e.message;
        });
  } else {
    data.status = {
      status_code: 400,
      message: 'Missing key: Company',
    };
  }
  return res.status(data.status.status_code).send({
    data: data.data,
    status: data.status,
  });
});

export default router;
