import { Router } from 'express';

const accountRouter = Router();

accountRouter.get('/', (req, res) => {
  res.send({});
});

export default accountRouter;
