import { Router } from "express";

import controller from "./controller.js";

import validation from "../../middlewares/validation.js";

const router = Router();

router.post("/login", validation, controller.LOGIN);
router.post("/register", validation, controller.REGISTER);

export default router;
