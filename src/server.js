import express from 'express';
import { getData } from './controller/data.js';
const app = express();

app.get('/hey', (req, res) => res.send('ho!'))

app.get('/api/data', getData);

app.listen(8080, () => {
  console.log("listening on port 8080");
})
