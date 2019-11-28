import { Router } from 'express';

import { createAccount, findAccount } from '@/api/controllers';

const accountRouter = Router();

accountRouter.post('/create', createAccount);
accountRouter.get('/find', findAccount);

export default accountRouter;
