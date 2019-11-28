import { Router } from 'express';

import { createRating, findRating } from '@/api/controllers';

const ratingRouter = Router();

ratingRouter.post('/create', createRating);
ratingRouter.get('/find', findRating);

export default ratingRouter;
