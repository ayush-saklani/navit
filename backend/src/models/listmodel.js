import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    type: String,
    data: Object,
});

const Lists = new mongoose.model("lists", listSchema);

export default Lists;



const map_node_schema = mongoose.Schema({
    "node": {
        type: String,
        required: [true, 'name of node (number)']
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
    "note": {
        type: String,
        required: false
    }
});
const node_inter_connection_schema = mongoose.Schema({
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
const map_node_model = new mongoose.model("map_node_model", map_node_schema)
const node_inter_connection_model = new mongoose.model("node_inter_connection_model", node_inter_connection_schema)
model.export(map_node_model);
model.export(node_inter_connection_model);