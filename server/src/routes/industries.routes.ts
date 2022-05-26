import express, {Router, Request, Response} from 'express';
import {dbAction} from '../db_connection';
import {getRDSSecret} from '../secrets';
const router = Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/industry', async (
    req: Request,
    res: Response): Promise<Response> => {
  console.log(req.body);
  try {
    const data = await dbAction(await getRDSSecret(),
        `SELECT industry FROM industry;`);

    return res.status(data.status.status_code).send({
      data: data.data,
      status: data.status,
    });
  } catch (err) {
    console.log('Status 500 from GET \'/industry\'');
    return res.status(500).send();
  }
});


router.delete('/industry', async (
    req: Request,
    res: Response): Promise<Response> => {
  console.log(req.body);
  try {
    const data = await dbAction(await getRDSSecret(),
        `DELETE FROM industry WHERE industry_id = $1`, ['industry_id'],
        req.body);

    console.log(data);

    return res.status(data.status.status_code).send({
      data: data.data,
      status: data.status,
    });
  }
  // NOTE: try-catch block
  catch (err) {
    console.log('Status 500 from DELETE \'/industry\'');
    return res.status(500).send();
  }
});

router.post('/industry', async (
    req: Request,
    res: Response): Promise<Response> => {
  console.log(req.body);
  try {
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
  } catch (err) {
    console.log('Status 500 from POST \'/industry\'');
    return res.status(500).send();
  }
});

export default router;
