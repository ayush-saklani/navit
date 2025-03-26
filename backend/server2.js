//  Server.js version 3.0
import jsgraphs from 'js-graph-algorithms'; // Import the graph library
import cors from 'cors';                    // Import the cors middleware
import express from 'express'               // Import the express library
import { readFile } from 'fs/promises';     // Import the fs promises library
import fs from 'fs';                        // Import the fs library
import mongoose from 'mongoose';            // Import the mongoose library
import dotenv from 'dotenv';                // Import the dotenv library
// import navitmodel from 'model/navit-models.model.js';
import nodeModel from './models/nodeModel.js';
import edgeModel from './models/edgeModel.js';
import map from './models/mapModel.js';
import metadataschema from './models/metadataModel.js';
import metadata from './models/metadataModel.js';


dotenv.config();                            // Configure the dotenv library     ######### not done yet        

const app = express();                      // Create an express app (handler function)
const port = process.env.PORT || 3001;      // Set the port number              ######### not done yet    

app.use(cors());                            // Middleware to enable CORS
app.use(express.json());                    // Middleware to parse JSON bodies        

const g = new jsgraphs.WeightedGraph(7000); // Create a graph with 7000 nodes
const loadMap1 = () => {                        // Load the coordinates of the nodes and creates the graph 
    return new Promise((resolve, reject) => {
        edgeModel.find({}).then((data, err) => {
            if (err) {
                console.log("XXXX Map Load 1/2 incompleted XXXX");
                reject();
            }
            data.forEach(edgeObj => {
                g.addEdge(new jsgraphs.Edge(edgeObj.start, edgeObj.end, edgeObj.len));
                g.addEdge(new jsgraphs.Edge(edgeObj.end, edgeObj.start, edgeObj.len));
            });
            console.log(":::: Map Loaded 1/2 completed ::::");
            resolve();
        });
    });
};
const loadMap2 = () => {                        // Load the labels of the nodes and updates the graph nodes with the labels
    return new Promise((resolve, reject) => {
        nodeModel.find({}).then((data, err) => {
            if (err) {
                console.log("XXXX Map Load 2/2 incompleted XXXX");
                reject();
            }
            data.forEach(classObj => {
                let node = classObj.node;
                let label = classObj.label;
                g.node(node).label = classObj.lat + "," + classObj.long + "," + classObj.floor;
            });
            console.log(":::: Map Loaded 2/2 completed ::::");
            resolve();
        });
    });
};
const dijfunc = (src, des) => {                 // Dijkstra's Algorithm :: findS the shortest path RETURNS: Array of Arrays of Coordinates
    var dijkstra = new jsgraphs.Dijkstra(g, src);
    let e;
    // console.log("src, des :: ", src, des);
    // console.log("dijkstra.hasPathTo(des) :: ", dijkstra.hasPathTo(des));
    if (dijkstra.hasPathTo(des)) {
        let res = [[], [], [], [], [], [], []];
        var path = dijkstra.pathTo(des);
        let curr_floor;
        let temp_con = [];
        for (var i = 0; i < path.length; ++i) {
            e = path[i];
            let temp = (g.node(e.from()).label).split(',');
            if (i == 0) {
                curr_floor = eval(temp[2]) + 1;
            }
            let temparr = [];
            if (i != path.length - 1) {
                temparr.push(Number(temp[0]));
                temparr.push(Number(temp[1]));
                if ((eval(temp[2]) + 1) == curr_floor) {
                    temp_con.push(temparr);
                } else {
                    res[curr_floor].push(temp_con);
                    temp_con = [];
                    temp_con.push(temparr);
                    curr_floor = (eval(temp[2]) + 1);
                }
            } else if (i == path.length - 1) {
                let temp = (g.node(e.from()).label).split(',');
                let temparr = [];
                temparr.push(Number(temp[0]));
                temparr.push(Number(temp[1]));
                temp_con.push(temparr);
                temp = (g.node(e.to()).label).split(',');
                temparr = [];
                temparr.push(Number(temp[0]));
                temparr.push(Number(temp[1]));
                temp_con.push(temparr);
                res[curr_floor].push(temp_con);
            }
        }
        return {
            "distance": dijkstra.distanceTo(des),
            "antpath": res
        };
    } else {
        console.log('Error: Destination is unreachable from the source.');
        return null;
    }
};
const segregate_aminity = (src, keyword) => {   // Segregate the washrooms based on the keyword(1999:Gents 1998:Ladies) RETURNS: Array of Destinations
    try {
        src = Math.floor(eval(src));
        keyword = Math.floor(eval(keyword));
        let totalToilet = (keyword == 1999) ?
            [1083, 1051, 2083, 2051, 3083, 3051, 4083, 4051, 5083, 5051, 6083, 6051] :     // Gents Toilet
            [1099, 1029, 2099, 2029, 3099, 3029, 4099, 4029, 5099, 5029, 6099, 6029]       // Ladies Toilet
        if (Math.floor(eval(src / 1000)) == 0) {
            src = eval(src) + 1000;
        }
        let des = [];
        for (let i = 0; i < totalToilet.length; i++) {
            if (Math.floor(eval(src / 1000)) == Math.floor(eval(totalToilet[i]) / 1000)) {
                des.push(totalToilet[i]);
            }
        }
        return des;
    }
    catch (err) {
        // console.log("Error: Could not find suitable destination.");
        return null;
    }
};
const nearest_amenity = (src, keyword) => {     // Find the nearest washroom based on the keyword(1999:Gents 1998:Ladies) RETURNS: Array of Arrays of Coordinates of closest washroom
    let des = segregate_aminity(src, keyword);
    if (des !== null) {
        var dijkstra = new jsgraphs.Dijkstra(g, src);
        let distance = 9999;
        let distance_index = null;
        for (let i = 0; i < des.length; i++) {
            if (dijkstra.distanceTo(des[i]) < distance) {
                distance_index = des[i];
                distance = dijkstra.distanceTo(des[i]);
            }
        }
        return distance_index;
    } else {
        console.log('Error: Could not find suitable destination.');
        return null;
    }
};
app.get('/getCoordinates', (req, res) => {      // Get the coordinates of the any path RETURNS: Array of Arrays of Coordinates for antpaths
    let src = req.query.src;
    let des = req.query.des;
    // console.log(`:::: Source:${src} => Destination:${des} ::::`);
    let AmenityArr = ["1999", "1998"];
    let coordinates;
    if (AmenityArr.includes(des)) {
        des = nearest_amenity(src, des);
        if (des == null) {
            res.status(404).json({
                "status": 'error',
                "error": 'No path found.'
            });
        }
    }
    coordinates = dijfunc(src, des);
    // console.log("coordinates :: ", coordinates);    
    if (coordinates) {
        res.status(200).json({
            "status": 'success',
            "data": coordinates
        });
    } else {
        res.status(404).json({
            "status": 'error',
            "error": 'No path found.'
        });
    }
});
app.get('/getmap', async (req, res) => {        // Return an array of objects(document) representing floor of the map data
    try {
        let serverhitcount;
        await metadata.find({}).then((data, err) => {
            if (err) {
                console.log("Server Hit Count Fetching Error");
                reject();
            }
            serverhitcount = data[0].serverhitcount;
            // console.log(data[0].serverhitcount);
            metadata.updateOne({ serverhitcount: serverhitcount + 1 }).then((data, err) => {
                if (err) {
                    console.log("Server Hit Count increment Error");
                    reject();
                }
            });
            serverhitcount % 10 == 0 ? console.log(":::: Server Hit + 10 ::::") : "";
        });
        const mapdata = await map.find({});
        res.status(200).json({
            "status": 'success',
            "data": mapdata,
            "hitcount": serverhitcount
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/keepmeawake', (req, res) => {          // Keep the server awake
    res.status(200).json({ "status": 'Up and Running Boi' });
});

import { signup, verifyotp, signin, resendotp, resetpassword, resetpasswordverify } from './users.controller.js';

app.post('/signup', signup);
app.post('/verifyotp', verifyotp);
app.post('/signin', signin);
app.post('/resendotp', resendotp);
app.post('/resetpassword', resetpassword);
app.post('/resetpasswordverify', resetpasswordverify);

app.listen(port, async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log(':::: Mongo_DB Connected ::::')
    await loadMap1()
    await loadMap2()
    console.log(`:::: Server listening http://localhost:${port} ::::`)
    console.log(`:::: Go on , I'm listening ::::`)
});