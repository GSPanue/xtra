import { Router } from 'express';

const ratingRouter = Router();

ratingRouter.get('/', (req, res) => {
  res.send({});
});

export default ratingRouter;
