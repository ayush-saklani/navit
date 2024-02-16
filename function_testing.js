import jsgraphs from 'js-graph-algorithms';
import {g} from './map.mjs'
import express from 'express'
const app = express()
const port = 5000

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
        console.log('error hai bhaisaab service down hai mijan');
    }
}
export {dijfunc};
let res = dijfunc(0,3);
console.log(res[0]);


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })