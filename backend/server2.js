//  Server.js version 2.1
import jsgraphs from 'js-graph-algorithms';
import cors from 'cors'; // Import the cors middleware
import express from 'express'
import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ok } from 'assert';
// import navitmodel from 'model/navit-models.model.js';

dotenv.config();

const app = express();   // Create an express app (handler function)
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
// Middleware to parse JSON bodies

app.get('/getmap', async (req, res) => {
    try {
        const data = await readFile('mapAllInOne.json', 'utf-8');
        let mapdata = JSON.parse(data);
        console.log(":::: map sent ::::");
        res.status(200).json({
            "status": 'success',
            "data": mapdata

        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


let curr_slot_data = [];
const g = new jsgraphs.WeightedGraph(7000);
const loadMap = () => {
    return new Promise((resolve, reject) => {
        readFile('assets/map_coordinates.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let edges = JSON.parse(data);
                edges.forEach(edgeObj => {
                    g.addEdge(new jsgraphs.Edge(edgeObj.start, edgeObj.end, edgeObj.len));
                    g.addEdge(new jsgraphs.Edge(edgeObj.end, edgeObj.start, edgeObj.len));
                });
            }
        });
        readFile('assets/map_coordinates_label_updated.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let labels = JSON.parse(data);
                labels.forEach(classObj => {
                    let node = classObj.node;
                    let label = classObj.label;
                    g.node(node).label = classObj.lat + "," + classObj.long + "," + classObj.floor;
                });
                resolve();
            }
        });
    });
};
const dijfunc = (src, des) => {
    var dijkstra = new jsgraphs.Dijkstra(g, src);
    let e;
    console.log("src, des :: ", src, des);
    console.log("dijkstra.hasPathTo(des) :: ", dijkstra.hasPathTo(des));
    if (dijkstra.hasPathTo(des)) {
        let res = [[], [], [], [], [], [], []];
        var path = dijkstra.pathTo(des);
        let curr_floor = 0;
        let temp_con = [];
        for (var i = 0; i < path.length; ++i) {
            e = path[i];
            let temp = (g.node(e.from()).label).split(',');
            if (i == 0) {
                curr_floor = temp[2];
            }
            let temparr = [];
            if (i != path.length - 1) {
                temparr.push(Number(temp[0]));
                temparr.push(Number(temp[1]));
                if (temp[2] == curr_floor) {
                    temp_con.push(temparr);
                } else {
                    res[curr_floor].push(temp_con);
                    temp_con = [];
                    temp_con.push(temparr);
                    curr_floor = temp[2];
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
        return res;
    } else {
        console.log('Error: Destination is unreachable from the source.');
        return null;
    }
};
const nearest_amenity = (src, keyword) => {
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
        return dijfunc(src, distance_index);
    } else {
        console.log('Error: Could not find suitable destination.');
        return null;
    }
};
const segregate_aminity = (src, keyword) => {
    // let totalToilet = keyword == 999 ? [83, 51,1083, 1051,2083, 2051,3083, 3051,4083, 4051,5083, 5051] : [99, 29,1099, 1029,2099, 2029,3099, 3029,4099, 4029,5099, 5029]
    // let des = [];
    // for (let i = 0; i < totalToilet.length; i++) {
    //     if (src%1000 == totalToilet[i]%1000) {
    //         des.push(totalToilet[i]);
    //     }
    // } // imporve for undergroung floor
    // return des;
    if (keyword == 999) { // gents washroom
        if (src > 0 && src < 1000 || src >= 6000 && src < 7000) return [83, 51];
        else if (src >= 1000 && src < 2000) return [1083, 1051];
        else if (src >= 2000 && src < 3000) return [2083, 2051];
        else if (src >= 3000 && src < 4000) return [3083, 3051];
        else if (src >= 4000 && src < 5000) return [4083, 4051];
        else if (src >= 5000 && src < 6000) return [5083, 5051];
    }
    else if (keyword == 998) {// ladies washroom
        if (src > 0 && src < 1000 || src >= 6000 && src < 7000) return [99, 29];
        else if (src >= 1000 && src < 2000) return [1099, 1029];
        else if (src >= 2000 && src < 3000) return [2099, 2029];
        else if (src >= 3000 && src < 4000) return [3099, 3029];
        else if (src >= 4000 && src < 5000) return [4099, 4029];
        else if (src >= 5000 && src < 6000) return [5099, 5029];
    }
    else {
        console.log('Error: Arey Bhaisab kis line me aa gaye aap.');
    }
};
// Route to handle POST requests from the HTML page
app.post('/getCoordinates', (req, res) => {
    const { src, des } = req.body;
    console.log(src, des);
    let coordinates;
    let aminity = [999, 998];
    console.log(`:::: Source:${src} => Destination:${des} ::::`);
    if (aminity.includes(des)) {
        coordinates = nearest_amenity(src, des);
    } else {
        coordinates = dijfunc(src, des);
    }
    if (coordinates) {
        res.json(coordinates);
    } else {
        res.status(404).json({ error: 'No path found.' });
    }
});
app.post('/getstatus', async (req, res) => {    //  it return the status of the room
    try {
        if (curr_slot_data) {
            // console.log(curr_slot_data);
            console.log("curr_slot_data :: sent");
            res.json(curr_slot_data);
        } else {
            res.status(404).json({ error: 'curr_slot_data :: [not sent] data unavailable.' });
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.listen(port, () => {
    console.log(`:::: Server listening http://localhost:${port} ::::`)
    console.log(process.env.DBURI);
});
//old code is stored in .env file