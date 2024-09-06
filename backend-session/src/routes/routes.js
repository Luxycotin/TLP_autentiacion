import { Router } from "express";
import { session, logout, register, login } from "../controllers/controller.js";

const ruta = Router();

ruta.get("/session", session);
ruta.post("/logout", logout);
ruta.post("/register", register);
ruta.post("/login", login)
export {ruta }
