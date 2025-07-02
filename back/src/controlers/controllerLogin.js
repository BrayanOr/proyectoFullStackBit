import bcrypt from "bcryptjs";
import { generarToken, verificarToken } from "../ayudas/funciones.js";
import modelusers from "../models/modelusers.js";

const controllerLogin = {
    iniciarSesion: async (sol, res) => {
        try{
            const {username, password} = sol.body;
            userFound = await modelusers.findOne({
                email: username,
            });

            const contraseniaValidada = await bcrypt.compare(
                password,
                userFound.password
            );
            
            if(contraseniaValidada){
                const token = await generarToken({
                    id: userFound._id,
                    email: userFound.name
                });
                res.json({
                    result: 'fine',
                    message: 'Access ready',
                    data: token
                })
            }else{
                res.json({
                    result: 'mistake',
                    message: 'Access denied',
                    data: null
                });
            }
        }catch(error){
            res.json({
                result: "Mistake",
                message: "Error during login",
                data: error,
            });
        }
    },

    validarToken: async (sol, res) => {
        try {
            const  token = sol.params.token;
            const decodificado = await verificarToken(token);

            if (decodificado && decodificado.id) {
                res.json({
                    result: "Fine",
                    message: "Token is valid",
                    data: decodificado,
                })
            }else {
                res.json({
                    result: "Mistake",
                    message: "Token is not valid",
                    data: null,
                });
            }
        }catch (error) {
            res.json({
                result: "Mistake",
                message: "Error validating token",
                data: error,
            });
        }
    }
}

export default controllerLogin;