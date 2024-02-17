import jsgraphs from 'js-graph-algorithms';
import {g} from './map.mjs'
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
export {dijfunc};
let res = dijfunc(0,3);
console.log(res);

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle POST requests from the HTML page
app.post('/getCoordinates', (req, res) => {
    const { src, des } = req.body;

    // Execute the dijfunc function with the provided source and destination
    const coordinates = dijfunc(src, des);

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
