import express, {Router, Request, Response} from 'express';
import {dbAction} from '../db_connection';
import {getRDSSecret} from '../secrets';
const router = Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/industry', async (
    req: Request,
    res: Response): Promise<Response> => {
  const data = await dbAction(await getRDSSecret(),
      `SELECT industry FROM industry;`);

  if (res.status(200)) {
    return res.status(data.status.status_code).send({
      data: data.data,
      status: {
        status_code: 200,
        message: 'Success',
      },
    });
  }
  console.log('Status 500 from get \'/industry\'');
  return res.status(500).send();
});


router.delete('/industry', async (
    req: Request,
    res: Response): Promise<Response> => {
  const data = await dbAction(await getRDSSecret(),
      `DELETE FROM industry WHERE industry_id = $1;`, ['industry_id'],
      req.body);

  if (res.status(200)) {
    return res.status(data.status.status_code).send({
      data: data.data,
      status: {
        status_code: 200,
        message: 'Success',
      },
    });
  }
  console.log('Status 500 from get \'/industry\'');
  return res.status(500).send();
});

router.post('/industry', async (
    req: Request,
    res: Response): Promise<Response> => {
  const data = await dbAction(await getRDSSecret(),
      `INSERT INTO industry
      (industry)
      VALUES ($1) RETURNING indust_id;`,
      ['industry'],
      req.body);

  if (res.status(200)) {
    return res.status(data.status.status_code).send({
      data: data.data,
      status: {
        status_code: 200,
        message: 'Success',
      },
    });
  }
  console.log('Status 500 from get \'/industry\'');
  return res.status(500).send();
});

export default router;
