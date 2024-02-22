import jsgraphs from 'js-graph-algorithms';
import {g} from './newmap.js'
import cors from 'cors'; // Import the cors middleware
import express from 'express'
const app = express()
const port = 3000
app.use(cors());


// this funciton takes maps from map.mjs and returns the polyline coordinates
let dijfunc = (src,des) =>{
    var dijkstra = new jsgraphs.Dijkstra(g, src);
    let e;
    if(dijkstra.hasPathTo(des)){
        let res = [[],[],[],[],[],[],[]];
        var path = dijkstra.pathTo(des);
        for(var i = 0; i < path.length; ++i) {
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
let nearest_amenity = (src,keyword) =>{
    let des = segregate_aminity(src,keyword);
    var dijkstra = new jsgraphs.Dijkstra(g, src);
    if(dijkstra.hasPathTo(des[0]) && !dijkstra.hasPathTo(des[1]))
        return des[0];
    else if(dijkstra.hasPathTo(des[0]) && !dijkstra.hasPathTo(des[1]))
        return des[1];
    else if(dijkstra.hasPathTo(des[0]) && dijkstra.hasPathTo(des[1]))
        return dijkstra.distanceTo(des[0])<dijkstra.distanceTo(des[1])? des[0] : des[1] ;
    else{
        console.log('second service me error hai bhaisaab service down hai shayad');
    }
}
let segregate_aminity = (src,keyword) =>{
    if(keyword==999){
        if(src>0 && src<1000){
            return[83,51];
        }
        else if(src>=1000 && src<2000){
            return[1083,1051];
        }
        else if(src>=2000 && src<3000){
            return[2083,2051];
        }
        else if(src>=3000 && src<4000){
            return[3083,3051];
        }
        else if(src>=4000 && src<5000){
            return[4083,4051];
        }
        else if(src>=5000 && src<6000){
            return[5083,5051];   
        }
        else if(src>=6000 && src<7000){
            return[83,51];
        }
    }
    else if(keyword==998){
        if(src>0 && src<1000){
            return[99,29];
        }
        else if(src>=1000 && src<2000){
            return[1099,1029];
        }
        else if(src>=2000 && src<3000){
            return[2099,2029];
        }
        else if(src>=3000 && src<4000){
            return[3099,3029];
        }
        else if(src>=4000 && src<5000){
            return[4099,4029];
        }
        else if(src>=5000 && src<6000){
            return[5099,5029];   
        }
        else if(src>=6000 && src<7000){
            return[99,29];
        }        
    }
    else{
        console.log('second service me error hai bhaisaab service down hai shayad');
    }
}
export {dijfunc};
let res = dijfunc(1,3);
console.log(res);
console.log(nearest_amenity(71, 998));

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
        coordinates = dijfunc(src, temp_des);
    }else{
        coordinates = dijfunc(src, des);
    }

    // Check if coordinates were found
    if (coordinates) {
        res.json(coordinates);
    } else {
        res.status(404).json({ error: 'No path found.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
