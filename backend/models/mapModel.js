import mongoose from "mongoose";

const mapSchema = new mongoose.Schema({
    floor: String,
    map: Object,
});

const map = mongoose.model("map", mapSchema);
export default map;