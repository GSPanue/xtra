import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import api from '@/api';

const app = express();
const port = process.env.PORT || 3000;
const staticPath = path.join('..', 'frontend/dist');

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(staticPath));
app.use('/api/v1', api);

app.get('*', (req, res) => {
  res.sendFile('/frontend/dist/index.html', {
    root: '..'
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default app;
