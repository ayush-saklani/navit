import pkg from 'js-graph-algorithms';
const { Graph,WeightedGraph, Edge, Dijkstra } = pkg;
import {g} from './map.mjs'
g.node(0  ).label='[30.2731289, 77.9997726]';  
g.node(1  ).label='[30.2732541, 77.9998359]';  
g.node(26 ).label='[30.2733582, 77.9999662]';  
g.node(27 ).label='[30.2734329, 78.0001123]';  
g.node(28 ).label='[30.2731289, 77.9997726]';  
g.node(2  ).label='[30.2732541, 77.9998359]';  
g.node(102).label='[30.2733582, 77.9999662]';  
g.node(202).label='[30.2734329, 78.0001123]';  
g.node(302).label='[30.2732541, 77.9998359]';  
g.node(402).label='[30.2733582, 77.9999662]';  
g.node(502).label='[30.2734329, 78.0001123]';  
var src =0;
var dijkstra = new Dijkstra(g, src);
// console.log(dijkstra.distanceTo(14))
for(var v = 1; v < g.V; ++v){
    if(dijkstra.hasPathTo(v)){
        var path = dijkstra.pathTo(v);
        console.log('=====path from 0 to ' + v + ' start==========');
        for(var i = 0; i < path.length; ++i) {
            var e = path[i];
            console.log(e.from() + ' => ' + e.to() + ': ' + e.weight);
            console.log(g.node(502).label);
            // console.log(g.node(e.from()).label);
            // console.log(g.node(0  ).label  );
        }
        console.log(dijkstra.distanceTo(v));
        
        console.log('distance from '+ src +' to '+ v +' => ' + dijkstra.distanceTo(v) );
    }
}