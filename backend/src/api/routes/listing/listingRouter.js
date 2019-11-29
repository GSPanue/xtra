import { Router } from 'express';

import {
  createListing,
  updateListing,
  findListing,
  removeListing
} from '@/api/controllers';

const listingRouter = Router();

listingRouter.post('/create', createListing);
listingRouter.put('/update', updateListing);
listingRouter.get('/find', findListing);
listingRouter.delete('/remove', removeListing);

export default listingRouter;
