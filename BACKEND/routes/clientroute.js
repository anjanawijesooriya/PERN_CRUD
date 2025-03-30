import express from "express";

import * as clientController from "../controllers/clientcontroller.js";

const router = express.Router();

router.get("/clients", clientController.getClients);

router.post("/clients/add", clientController.createClient);

router.put("/clients/edit/:id", clientController.updateClient);

router.delete("/clients/delete/:id", clientController.deleteClient);

router.get("/clients/search", clientController.searchClient);

export default router;
