import express, {Router, Request, Response} from 'express';
import {dbAction} from '../db_connection';
import {getRDSSecret} from '../secrets';
const router = Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/industries', async (
    req: Request,
    res: Response): Promise<Response> => {
  console.log(req.body);
  const data = await dbAction(await getRDSSecret(),
      `SELECT industry FROM industry;`);

  return res.status(data.status.status_code).send({
    data: data.data,
    status: data.status,
  });
});

router.post('/industry', async (
    req: Request,
    res: Response): Promise<Response> => {
  console.log(req.body);
  const data = await dbAction(await getRDSSecret(),
      `INSERT INTO industry
      (industry)
      VALUES ($1) RETURNING indust_id;`,
      ['industry'],
      req.body);

  return res.status(data.status.status_code).send({
    data: data.data,
    status: data.status,
  });
});

export default router;
