import bcrypt from "bcryptjs";
import modelusers from "../models/modelusers.js";
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const controllerUsers = {
    createUser: async (sol, res) => {
        try {
            const {name, email, password} = sol.body;
            console.log(sol.body);
            const passwordProtected = await bcrypt.hash(password, 10);
            const newUser = new modelusers({
                name,
                email,
                password: passwordProtected
            })
            console.log(newUser);

            const userCreated = await newUser.save();
            if(userCreated._id){
                res.json({
                    result: "Fine",
                    message: "User created successfully",
                    data: userCreated._id,
                })
            }
        }catch (error){
             res.json({
                    result: "Mistake",
                    message: "Error creating user",
                    data: userCreated._id,
                })
        }
    },
    readUser : async (sol, res) => {
        try {
            const {id} = sol.params;
            const userFound = await modelusers.findById(
                sol.params.id
            );
            if(userFound._id){
                res.json({
                    result: "Fine",
                    message: "User found successfully",
                    data: userFound,
                })
            }
        }catch (error){
            res.json({
                result: "Mistake",
                message: "Error finding user",
                data: error,
            })
        }
    },
    readUsers: async (sol, res) => {
        try {
            const allUsersFound = await modelusers.find();
            res.json({
                    result: "Fine",
                    message: "Users found successfully",
                    data: allUsersFound,
                })
        } catch (error) {
            res.json({
                result: "Mistake",
                message: "Error finding users",
                data: error,
            })
        }
    },
    upDateUser: async (sol, res) => {
        try {
            
            const userUpdate = await modelusers.findByIdAndUpdate(
                sol.params.id,
                sol.body
            );
            if(userUpdate._id){
                res.json({
                    result: "Fine",
                    message: "User updated",
                    data: userUpdate._id,
                });
            }
        } catch(error) {
            res.json({
                result: "Mistake",
                message: "Error updating user",
                data: error,
            });
        }
    },
    deleteUser: async (sol, res) => {
        try {
            const userDeleted = await modelusers.findByIdAndDelete(
                sol.params.id
            );
            if(userDeleted._id){
                res.json({
                    result: "Fine",
                    message: "User deleted successfully",
                    data: userDeleted._id,
                })
            }
        } catch (error) {
            res.json({
                result: "Mistake",
                message: "Error deleting user",
                data: error,
            })
        }
    }
};
// funcion para crear una contrasena aleatoria
function generarContrasenaAleatoria(){
    return crypto.randomBytes(6).toString('hex');
}

export const forgotPasword = async (sol , res)=>{
    try{
        const { email }= sol.body
        const user = await modelusers.findOne({email});
        if(!user){
            return res.status(404).json({message:'No se encontro el correo registrado en la base de datos'});
        }
        const nuevaPassword = generarContrasenaAleatoria();
        const hashedPassword = await bcrypt.hash(nuevaPassword , 10);

        user.password = hashedPassword;
        await user.save();

        // configuracion del servicio de correo 
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'brayanramirez018@gmail.com',
                pass: 'npemonkhornhhxxs'
            },
        });

        // contenido del correo
        const mailOptions = {
            from: 'brayanramirez018@gmail.com',
            to: email,
            subject: 'Recuperacion de contraseña',
            text: `Hola ${user.name}, \n\Tu nueva contraseña es: ${nuevaPassword}\n\ Recuerda actualizar tu contraseña en tu perfil por seguridad. \n\ Saludos desde el area de soporte.`
        };

        // envio de correo

        await transporter.sendMail(mailOptions);

        // Responder al usuario

        res.status(200).json({message: 'Se ha enviado una nueva contraseña al correo registrado.'});

    }catch(error){
        console.error('Error al recuperar la contraseña', error);
        res.status(500).json({message: ' Error interno en el servidor', error: error.message});
    }
}

export default controllerUsers;

