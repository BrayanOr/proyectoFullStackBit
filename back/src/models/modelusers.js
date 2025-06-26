import { Schema, model } from "mongoose";

const SchemaUsers = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

export default model("user", SchemaUsers);