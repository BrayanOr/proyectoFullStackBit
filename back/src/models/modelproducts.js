import { schema, model } from 'mongoose';

const esquemaProducto = new schema({
    modelo: { type: String, required: true },
    material: { type: String, required: true },
    precio: { type: Number, required: true },
    color: { type: String, required: true },
    imagen: { type: String, required: true },
},
{
    versionKey: false,
    timestamps: true
})

export default model("producto", esquemaProducto);