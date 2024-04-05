import jsgraphs from 'js-graph-algorithms';
// import {g} from './newmap.js'
import cors from 'cors'; // Import the cors middleware
import express from 'express'
import { readFile, writeFile, readFileSync } from 'fs';

const app = express()
const port = 3000
app.use(cors());


let g = new jsgraphs.WeightedGraph(7000);
function load_map(){
    readFile('map_coordinates.json', 'utf8', (err, data)=>{
        if(err){
            console.error("Error reading file:", err);
            return;
        }
        try{
            console.error("doing 1");
            let coordinates_par = JSON.parse(data);
            coordinates_par.forEach(classObj => {
                const start = classObj.start;
                const end = classObj.end;
                const len = classObj.len;
                console.error(start +" "+ end +" "+ len);
                g.addEdge(new jsgraphs.Edge(start,end,len));
            });
            console.error(g);
            console.error("doing 1");
        }catch (error) {
            console.error("Error parsing JSON:", error);
        }
    });
    readFile('map_coordinates_label.json', 'utf8', (err, data)=>{
        if(err){
            console.error("Error reading file:", err);
            return;
        }
        try{
            let label_par = JSON.parse(data);
            label_par.forEach(classObj => {
                const node = classObj.node;
                const label = classObj.label;
                g.node(node).label=label;
            });
            console.error("doing 2");
        }catch (error) {
            console.error("Error parsing JSON:", error);
        }
        app.listen(port, () => {
            console.log(`Server is listening at http://localhost:${port}`);
        });
    });    
}
// this funciton takes maps from map.mjs and returns the polyline coordinates
let dijfunc__version_1 = (src,des) =>{ 
    var dijkstra = new jsgraphs.Dijkstra(g, src);
    let e;
    if(dijkstra.hasPathTo(des)){
        let res = [[],[],[],[],[],[],[]];
        var path = dijkstra.pathTo(des);
        for(var i = 0; i < path.length; ++i){
            e = path[i];
            let temp = (g.node(e.from()).label).split(','); 
            let temparr = []
            temparr.push(Number(temp[0]));
            temparr.push(Number(temp[1]));
            res[temp[2]].push(temparr)
            if(i==path.length -1){
                let temp = (g.node(e.to()).label).split(','); 
                let temparr = []
                temparr.push(Number(temp[0]));
                temparr.push(Number(temp[1]));
                res[temp[2]].push(temparr)
            }
        }
        return res;
    }
    else{
        console.log('error hai bhaisaab service down hai shayad');
    }
}
let dijfunc2 = (src,des) =>{
    var dijkstra = new jsgraphs.Dijkstra(g, src);
    let e;
    if(dijkstra.hasPathTo(des)){
        let res = [[],[],[],[],[],[],[]];
        var path = dijkstra.pathTo(des);
        let curr_floor =0;
        let temp_con=[];
        for(var i = 0; i < path.length; ++i){
            e = path[i];
            let temp = (g.node(e.from()).label).split(','); 
            if(i==0){
                curr_floor = temp[2];
            }
            let temparr = []
            if(i!=path.length -1){
                temparr.push(Number(temp[0]));
                temparr.push(Number(temp[1]));
                if(temp[2]==curr_floor){
                    temp_con.push(temparr)
                }
                else{
                    res[curr_floor].push(temp_con);
                    temp_con=[]
                    temp_con.push(temparr)
                    curr_floor=temp[2];
                }
            }
            else if(i==path.length -1){
                let temp = (g.node(e.from()).label).split(','); 
                let temparr = []
                temparr.push(Number(temp[0]));
                temparr.push(Number(temp[1]));
                temp_con.push(temparr)
                temp = (g.node(e.to()).label).split(','); 
                temparr = []
                temparr.push(Number(temp[0]));
                temparr.push(Number(temp[1]));
                temp_con.push(temparr)
                res[curr_floor].push(temp_con);
            }
        }
        return res;
    }
    else{
        console.log('error hai bhaisaab service down hai shayad');
    }
}
let nearest_amenity = (src,keyword) =>{
    let des = segregate_aminity(src,keyword);
    var dijkstra = new jsgraphs.Dijkstra(g, src);
    let distance = 9999;
    let distance_index=null;
    for (let i = 0; i < des.length; i++) {
        if(dijkstra.distanceTo(des[i])<distance){
            distance_index = des[i];
            distance = dijkstra.distanceTo(des[i]);
        }
    }
    return distance_index;
}
let segregate_aminity = (src,keyword) =>{
    if(keyword==999){
        if(src>0 && src<1000 || src>=6000 && src<7000)  return[83,51];
        else if(src>=1000 && src<2000)  return[1083,1051];
        else if(src>=2000 && src<3000)  return[2083,2051];
        else if(src>=3000 && src<4000)  return[3083,3051];
        else if(src>=4000 && src<5000)  return[4083,4051];
        else if(src>=5000 && src<6000)  return[5083,5051];
    }
    else if(keyword==998){
        if(src>0 && src<1000 || src>=6000 && src<7000)  return[99,29];
        else if(src>=1000 && src<2000)  return[1099,1029];
        else if(src>=2000 && src<3000)  return[2099,2029];
        else if(src>=3000 && src<4000)  return[3099,3029];
        else if(src>=4000 && src<5000)  return[4099,4029];
        else if(src>=5000 && src<6000)  return[5099,5029];   
    }
    else{
        console.log('second service me error hai bhaisaab service down hai shayad');
    }
}

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle POST requests from the HTML page
app.post('/getCoordinates', (req, res) => {
    const { src, des } = req.body;
    
    // Execute the dijfunc function with the provided source and destination
    let coordinates;
    if (des==999 || des==998 ) {
        console.log(src);
        console.log(des);
        let temp_des = nearest_amenity(src, des);
        coordinates = dijfunc2(src, temp_des);
    }else{
        coordinates = dijfunc2(src, des);
    }

    // Check if coordinates were found
    if (coordinates) {
        res.json(coordinates);
    } else {
        res.status(404).json({ error: 'No path found.' });
    }
});

// Start the server
load_map();