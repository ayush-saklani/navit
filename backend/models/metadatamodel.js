import mongoose from "mongoose";

const metadataschema = new mongoose.Schema({
    serverhitcount: Number
});

const metadata = mongoose.model("metadata", metadataschema);
export default metadata;