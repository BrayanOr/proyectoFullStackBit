import express from "express"; // para realizar la conexion con el servidor
import morgan from "morgan"; //monitrear solicitudes http
import cors from "cors";
import routerUsers from "./routers/routerUsers.js"; // importar las rutas de los usuarios
import routerProducts from "./routers/routerProducts.js";
import routerLogin from "./routers/routerLogin.js";

const servidor = express();
servidor.use(cors()); // para permitir el acceso a la api desde cualquier origen
servidor.use(morgan("dev"));
servidor.use(express.json());
servidor.use("/users", routerUsers);
servidor.use('/inicioSesion', routerLogin);
servidor.use('/products', routerProducts);

servidor.get('/' , (sol, res) => {
    res.status(404).send("No se conecto")
});

export default servidor;