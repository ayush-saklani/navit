import mongoose from "mongoose";

const nodeSchema = mongoose.Schema({
    "node": {
        type: String,
        required: true
    },
    "lat": {
        type: String,
        required: true
    },
    "long": {
        type: String,
        required: true
    },
    "floor": {
        type: String,
        required: true
    },
    "type": {
        type: String,
        required: true
    },
    "label": {
        type: String,
        required: false
    }
});

const nodeModel = mongoose.model("map_node_model", nodeSchema);
model.export(nodeModel);