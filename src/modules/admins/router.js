import { Router } from "express";

import controller from "./controller.js";

import validation from "../../middlewares/validation.js";

import checkToken from "../../middlewares/checkToken.js";

const router = Router();

router.get("/admins", checkToken, controller.GET);
router.get("/admins/:adminId", checkToken, controller.GET);
router.post("/admins", checkToken, controller.POST);
router.post("/admins/login", validation, controller.LOGIN);

export default router;
