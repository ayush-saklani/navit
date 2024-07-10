import mongoose from "mongoose";

const edgeSchema = mongoose.Schema({
    "start": {
        type: Number,
        required: true
    },
    "end": {
        type: Number,
        required: true
    },
    "len": {
        type: Number,
        required: true
    }
});
const edge = mongoose.model("edge", edgeSchema)
model.export(edge);