import express from "express";
import PingController from "../controllers/ping";
import EstateController from "../controllers/estate.controller";


const router = express.Router();

router.get("/ping", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});

router.get("/estates", async (_req, res) => {
    const controller = new EstateController();
    const response = await controller.getEstates();
    return res.send(response);
});

router.delete("/estates", async (_req, res) => {
    const controller = new EstateController();
    const response = await controller.deleteEstates();
    return res.send(response);
})

router.post("/estates", async (req, res) => {
    const controller = new EstateController();
    const response = await controller.createEstate(req.body);
    return res.send(response);
});

router.post("/estates/test", async (req, res) => {
    const controller = new EstateController();
    const response = await controller.test(req.body);
    return res.send(response);
});

router.post("/estates/more", async (req, res) => {
    const controller = new EstateController();
    const response = await controller.createEstates(req.body);
    return res.send(response);
});

export default router;
