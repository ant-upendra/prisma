import { Router } from "express";
import UserRoutes from "./userRoutes.js";
import AdminRoutes from "./adminRoutes.js";

const router = Router();

router.use("/api/user", UserRoutes)
router.use("/api/admin", AdminRoutes)

export default router;