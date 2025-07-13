import { Schema, model } from "mongoose";

const SchemaUsers = new Schema({
    name: { type: String, required: true },
    email: { type: String,
         required: true,
         trim: true,
         match:[/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "email ivalid"],
        },
    password: { type: String,
         required: true,
        minlength: [7, "Password must be at least 7 characters long"],
        trim: true,
        match:[/^(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`])\S+$/,"password invalid"],
    },
     role:{
         type: String, 
         enum:["user", "admin"],
         default:"user",
         required: false
     }
})

export default model("user", SchemaUsers);