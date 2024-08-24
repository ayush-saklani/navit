import mongoose from "mongoose";

const nodeSchema = mongoose.Schema({
    "node": {                   // node number in the graph (0 to 6999) (alloted in the geojson file)
        type: Number,
        required: true
    },
    "lat": {                    // latitude 
        type: String,
        required: true
    },
    "long": {                   // longitude
        type: String,          
        required: true
    },
    "floor": {                  // "0", "1", "2", "3", "4", "5", "6"
        type: String,          
        required: true
    },
    "type": {                   // "classroom", "lecturetheater", "elevator", "staircase", "node"
        type: String,          
        required: true
    },
    "label": {                  // label to be displayed on the map (name of the classroom, lecture theater, etc.)
        type: String,
        required: false
    }
});

const node = mongoose.model("node", nodeSchema);
export default node;