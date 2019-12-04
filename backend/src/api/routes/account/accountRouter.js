import { Router } from 'express';

import { usePassport } from '@/helpers';
import { createAccount, authAccount, findAccount } from '@/api/controllers';

const accountRouter = Router();

accountRouter.post('/create', createAccount);
accountRouter.post('/auth', authAccount);
accountRouter.get('/find', usePassport(findAccount));

export default accountRouter;
