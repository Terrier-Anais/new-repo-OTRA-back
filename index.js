import express from "express";
import cors from "cors";
import { router  } from "./app/routers/index.js";
import { bodySanitizer } from "./app/middlewares/bodySanitizer.js";

export const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(bodySanitizer);
app.use("/api", router); 


// Middleware 404 (API)
// app.use((req, res) => {
//   // TODO: rediriger vers la documentation de l'API !
//   res.send("Not Found"); // FIXME
// });