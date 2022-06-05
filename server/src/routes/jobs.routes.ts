import express, {Router, Request, Response} from 'express';
import {dbAction} from '../db_connection';
import {getRDSSecret} from '../secrets';
const router = Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/job', async (
    req: Request,
    res: Response): Promise<Response> => {
  const data = await dbAction(await getRDSSecret(),
      `SELECT  job_title FROM job;`);

  if (res.status(200)) {
    return res.status(data.status.status_code).send({
      data: data.data,
      status: {
        status_code: 200,
        message: 'Success',
      },
    });
  }
  console.log('Status 500 from get \'/job\'');
  return res.status(500).send();
});

router.delete('/job', async (
    req: Request,
    res: Response): Promise<Response> => {
  const data = await dbAction(await getRDSSecret(),
      `DELETE FROM job WHERE job_id = $1;`, ['job_id'],
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
  console.log('Status 500 from delete \'/job\'');
  return res.status(500).send();
});

router.post('/job', async (
    req: Request,
    res: Response): Promise<Response> => {
  const data = await dbAction(await getRDSSecret(),
      `INSERT INTO job
    (job_title, company_id, salary, stocks, bonus, skill)
    VALUES ($1, $2, $3, $4) RETURNING job_id;`,
      ['job_title', 'company_id', 'salary', 'stocks', 'bonus', 'skill'],
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
  console.log('Status 500 from post \'/job\'');
  return res.status(500).send();
});

export default router;
