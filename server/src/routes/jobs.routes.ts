import express, {Router, Request, Response} from 'express';
import {dbAction} from '../db_connection';
import {getRDSSecret} from '../secrets';
const router = Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/job', async (
    req: Request,
    res: Response): Promise<Response> => {
  console.log(req.body);
  const data = await dbAction(await getRDSSecret(),
      `SELECT  job_title FROM job;`);

  return res.status(data.status.status_code).send({
    data: data.data,
    status: data.status,
  });
});

router.delete('/job', async (
    req: Request,
    res: Response): Promise<Response> => {
  console.log(req.body);
  const data = await dbAction(await getRDSSecret(),
      `DELETE FROM job WHERE job_id = $1`, ['id_id'],
      req.body);

  console.log(data);

  return res.status(data.status.status_code).send({
    data: data.data,
    status: data.status,
  });
});

router.post('/job', async (
    req: Request,
    res: Response): Promise<Response> => {
  console.log(req.body);
  try {
    const data = await dbAction(await getRDSSecret(),
        `INSERT INTO job
      (job_title, company_id, salary, stocks, bonus, skill)
      VALUES ($1, $2, $3, $4) RETURNING job_id;`,
        ['job_title', 'company_id', 'salary', 'stocks', 'bonus', 'skill'],
        req.body);
    return res.status(data.status.status_code).send({
      data: data.data,
      status: data.status,
    });
  }
  // NOTE: try-catch block
  catch (err) {
    console.log('Status 500 from POST \'/company\'');
    return res.status(500).send();
  }
});

export default router;
