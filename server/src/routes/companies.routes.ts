import express, {Router, Request, Response} from 'express';
import {connect, dbAction} from '../db_connection';
import {getRDSSecret} from '../secrets';
const router = Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/companies', async (
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

router.get('/company', async (
    req: Request,
    res: Response): Promise<Response> => {
  const conn = connect(await getRDSSecret());
  await conn.connect();

  const resp = await conn.query(`
        SELECT * FROM companies 
        WHERE company_name = $1;`,
  [req.body.company_name]);

  await conn.end();

  return res.status(200).send({
    data: resp.rows,
    status: {
      status_code: 200,
      message: 'Success',
    },
  });
});

router.delete('/company', async (
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

router.post('/company', async (
    req: Request,
    res: Response): Promise<Response> => {
  console.log(req.body);
  const data = await dbAction(await getRDSSecret(),
      `INSERT INTO companies 
      (company_name, state, country, industry_id)
      VALUES ($1, $2, $3, $4) RETURNING company_id;`,
      ['company_name', 'state', 'country', 'industry_id'],
      req.body);

  return res.status(data.status.status_code).send({
    data: data.data,
    status: data.status,
  });
});

export default router;
