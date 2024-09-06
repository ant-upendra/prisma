import { Router } from "express";
import { createUser, getAllUsers, getUserById, removeUser, updateUser } from "../controller/userController.js";

const router = Router();

router.post("/", createUser); 
router.put("/:id", updateUser);
router.delete("/:id", removeUser); 
router.get("/:id", getUserById); 
router.get("/", getAllUsers);

export default router;
