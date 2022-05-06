import express, {Router, Request, Response} from 'express';
import {connect, dbAction} from '../db_connection';
import {getRDSSecret} from '../secrets';
import {dataResponse} from '../types';
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

router.delete('/delete_company', async (
    req: Request,
    res: Response): Promise<Response> => {
  console.log(req.body);
  const data = await dbAction(await getRDSSecret(),
      `DELETE FROM companies WHERE company_id = $1`, ['company_id'],
      req.body);

  console.log(data);

  return res.status(data.status.status_code).send({
    data: data.data,
    status: data.status,
  });
});

router.post('/insert_company', async (
    req: Request,
    res: Response): Promise<Response> => {
  console.log(req.body);
  const data = await dbAction(await getRDSSecret(),
      `INSERT INTO companies (company_name) VALUES ($1) RETURNING company_id;`,
      ['company_name'],
      req.body);

  return res.status(data.status.status_code).send({
    data: data.data,
    status: data.status,
  });
});

export default router;
