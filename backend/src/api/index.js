import express from 'express';

import { accountRouter, listingRouter, ratingRouter } from './routes';

const api = express();

api.use('/account', accountRouter);
api.use('/listing', listingRouter);
api.use('/rating', ratingRouter);

export default api;
