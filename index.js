import express from "express";
import cors from "cors";
import { router  } from "./app/routers/index.js";
import { bodySanitizer } from "./app/middlewares/bodySanitizer.js";
// import { jwtService } from "../projet-on-the-road-again-back/app/middlewares/jwt.service.js";

import bodyParser from "body-parser";

export const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(express.static('public'));
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(bodySanitizer);
app.use("/api", router); 


// Middleware 404 (API)
app.use((req, res) => {
  // TODO: rediriger vers la documentation de l'API !
  res.send("Not Found"); // FIXME
});


