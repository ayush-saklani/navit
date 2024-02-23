import jsgraphs from 'js-graph-algorithms';
import {g} from './newmap.js'
import cors from 'cors'; // Import the cors middleware
import express from 'express'
const app = express()
const port = 3000
app.use(cors());


let dijfunc2 = (src,des) =>{
    var dijkstra = new jsgraphs.Dijkstra(g, src);
    let e;
    if(dijkstra.hasPathTo(des)){
        let res = [[],[],[],[],[],[],[]];
        var path = dijkstra.pathTo(des);
        let floor = (g.node(path[0].from()).label).split(',')[2];
        let temparr2 =[];
        let tempo;
        for(var i = 0; i < path.length; ++i) {
            e = path[i];
            let temp = (g.node(e.from()).label).split(','); 
            let temparr = []
            temparr.push(Number(temp[0]));
            temparr.push(Number(temp[1]));
            res[temp[2]].push(temparr)
            if(floor-temp[2]!= 0){
                
            }
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

let res = dijfunc2(3084, 3085);
console.log(res);





// // Middleware to parse JSON bodies
// app.use(express.json());

// // Route to handle POST requests from the HTML page
// app.post('/getCoordinates', (req, res) => {
//     const { src, des } = req.body;
    
//     // Execute the dijfunc function with the provided source and destination
//     let coordinates;
//     if (des==999 || des==998 ) {
//         console.log(src);
//         console.log(des);
//         let temp_des = nearest_amenity(src, des);
//         coordinates = dijfunc(src, temp_des);
//     }else{
//         coordinates = dijfunc(src, des);
//     }

//     // Check if coordinates were found
//     if (coordinates) {
//         res.json(coordinates);
//     } else {
//         res.status(404).json({ error: 'No path found.' });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is listening at http://localhost:${port}`);
// });
