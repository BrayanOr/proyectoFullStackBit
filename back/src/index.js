import "dotenv/config";
import "./conexion.js"
import servidor from "./servidor";
servidor.listen(3000, () => {
    console.log("El servidor esta escuchado en el link http://localhost:3000");
})