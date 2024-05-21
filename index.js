import express from "express";
import cors from "cors";
import { router  } from "./app/routers/index.js";
import { bodySanitizer } from "./app/middlewares/bodySanitizer.js";

// Create app
export const app = express();

// Autoriser les requêtes Cross-Origin
app.use(cors({ origin: process.env.CORS_ORIGIN }));

// Body parsers
app.use(express.json()); // Body parser pour traiter les body au format JSON (`application/json`)
app.use(express.urlencoded({ extended: true })); // Body parser pour traiter les body au format des formulaires HTMP (`applicaiton/x-www-urlencoded`)

// Prevent XSS injections
app.use(bodySanitizer);



// Configure app
app.use("/api", router); // On pourrait mettre `/api/v1` si on prévoit de maintenir le système longtemps

// Middleware 404 (API)
app.use((req, res) => {
  // TODO: rediriger vers la documentation de l'API !
  res.send("Not Found"); // FIXME
});