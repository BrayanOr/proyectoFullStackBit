import { Schema, model } from "mongoose";

const SchemaUsers = new Schema({
    name: { type: String, required: true },
    email: { type: String,
         required: true,
         trim: true,
         match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
, "Please fill a valid email address"],},
    password: { type: String,
         required: true,
        minlength: [7, "Password must be at least 7 characters long"],
        trim: true,
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$^&*()_\-]).{7,10}$/],
    },
})

export default model("user", SchemaUsers);