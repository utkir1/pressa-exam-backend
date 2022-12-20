import { Router } from "express";

import checkToken from "../../middlewares/checkToken.js";

import controller from "./controller.js";

const router = Router();

router.get("/conferences", controller.GET);
router.get("/conferences/:conferenceId", controller.GET);
router.post("/conferences", checkToken, controller.POST);
router.put("/conferences/status/:conferenceId", checkToken, controller.PUTSTATUS);

export default router;
