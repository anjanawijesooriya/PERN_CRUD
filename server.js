import express from "express";
import cors from "cors";

import clientRoute from "./BACKEND/routes/clientroute.js"
const app = express();
const port = 8070;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api", clientRoute);
