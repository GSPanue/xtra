import { Router } from 'express';

import { usePassport } from '@/helpers';
import { createAccount, authAccount, findAccount, logout } from '@/api/controllers';

const accountRouter = Router();

accountRouter.post('/create', createAccount);
accountRouter.post('/auth', authAccount);
accountRouter.get('/find', usePassport(findAccount));
accountRouter.post('/logout', usePassport(logout));

export default accountRouter;
