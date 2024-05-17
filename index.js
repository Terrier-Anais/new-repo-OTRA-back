import { config } from "dotenv";
import express from "express";
config();
import router from './app/routers/user.router.js'
const app = express();

app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Serveur à l'écoute sur http://localhost:${port}`);
});
