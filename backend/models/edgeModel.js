import mongoose from "mongoose";

const edgeSchema = mongoose.Schema({
    "start": {                  // node number in the graph (0 to 6999) (alloted in the geojson file)
        type: Number,
        required: true
    },
    "end": {                    // end node number in the graph (0 to 6999) (alloted in the geojson file)    
        type: Number,
        required: true
    },
    "len": {                    // length of the edge (in meters) (calculated during preprocessing using haversine formula)
        type: Number,
        required: true
    }
});
const edge = mongoose.model("edge", edgeSchema)   ;

export default edge;