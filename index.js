import { config } from "dotenv";
import express from "express";
import client from './app/datamappers/pg.client.js';
config();
import router from './app/routers/user.router.js'
const app = express();


// app.get('/signup', async (req, res) => {
//     const { rows } = await client.query('SELECT * FROM trip');
//     await client.end();
//     res.json(rows);
// });

app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Serveur à l'écoute sur http://localhost:${port}`);
});
