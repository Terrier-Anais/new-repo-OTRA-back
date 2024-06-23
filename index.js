import express from "express";
import cors from "cors";
import "dotenv/config";
import { router } from "./app/routers/index.js";
import { bodySanitizer } from "./app/middlewares/bodySanitizer.js";

export const app = express();

app.use(express.static('public'));
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json({ limit: '50mb', extended: true })); 
app.use(express.urlencoded({ extended: true })); 
app.use(bodySanitizer);
app.use("/api", router);

// swagger(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
