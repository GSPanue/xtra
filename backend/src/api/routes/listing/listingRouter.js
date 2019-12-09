import { Router } from 'express';

import { usePassport } from '@/helpers';
import {
  createListing,
  updateListing,
  findListing,
  removeListing
} from '@/api/controllers';

const listingRouter = Router();

listingRouter.post('/create', usePassport(createListing));
listingRouter.put('/update', usePassport(updateListing));
listingRouter.get('/find', findListing);
listingRouter.post('/remove', usePassport(removeListing));

export default listingRouter;
