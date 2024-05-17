import { config } from "dotenv";
import express from "express";
import pkg from 'pg';
const { Client } = pkg;
config();
const app = express();
app.get('/', async (req, res) => {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    await client.connect();
    const { rows } = await client.query('SELECT * FROM trip');
    await client.end();
    res.json(rows);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`:fusée: Serveur à l'écoute sur http://localhost:${port}`);
});