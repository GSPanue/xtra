import express from 'express';

import { accountRouter, listingRouter } from './routes';

const api = express();

api.use('/account', accountRouter);
api.use('/listing', listingRouter);

export default api;
