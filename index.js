import { config } from "dotenv";
import express from "express";
config();
import {router as routerUser} from './app/routers/user.router.js'
export const app = express();

app.use(routerUser);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Serveur à l'écoute sur http://localhost:${port}`);
});
