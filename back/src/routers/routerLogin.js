import { Router } from "express";
import controllerLogin from "../controlers/controllerLogin.js";


const routerLogin = Router();

routerLogin.post("/", controllerLogin.iniciarSesion);
routerLogin.get("/token/:token", controllerLogin.validarToken);

export default routerLogin;