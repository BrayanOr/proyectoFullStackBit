import { Router } from "express";
import controllerUsers, {forgotPasword} from "../controlers/controllerUsers.js";

const routerUsers = Router();

routerUsers.post("/", controllerUsers.createUser);
routerUsers.get("/:id", controllerUsers.readUser);
routerUsers.get("/", controllerUsers.readUsers);
routerUsers.put("/:id", controllerUsers.upDateUser);
routerUsers.delete("/:id", controllerUsers.deleteUser);

export default routerUsers;