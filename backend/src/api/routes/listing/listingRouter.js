import { Router } from 'express';

const listingRouter = Router();

listingRouter.get('/', (req, res) => {
  res.send({});
});

export default listingRouter;
