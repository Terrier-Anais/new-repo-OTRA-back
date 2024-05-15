import express from "express";
import cors from "cors";
import { router as apiRouter } from "./src/routers/index.js"; // Attention, ajouter l'extension en ESM
import { bodySanitizer } from "./src/middlewares/bodySanitizer.js";

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
app.use("/api", apiRouter); // On pourrait mettre `/api/v1` si on prévoit de maintenir le système longtemps

// Middleware 404 (API)
app.use((req, res) => {
  // TODO: rediriger vers la documentation de l'API !
  res.send("Not Found"); // FIXME
});