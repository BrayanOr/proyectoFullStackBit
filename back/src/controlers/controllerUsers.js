import bcrypt from "bcryptjs";
import modelusers from "../models/modelusers.js";

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
                    data: usersFound,
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

export default controllerUsers;