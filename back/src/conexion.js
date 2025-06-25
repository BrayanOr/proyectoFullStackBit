import mongoose from "mongoose";
mongoose

.connect(process.env.mongodb)
.then((dato => {
    console.log("esta conectado a la base de datos");
}).catch((error) => {
    console.log("no se conceto a la base de datos");
}))