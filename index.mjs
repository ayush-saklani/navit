import pkg from 'js-graph-algorithms';
const { Graph,WeightedGraph, Edge, Dijkstra } = pkg;
import {g} from './map.mjs'

// testing below
g.node(0  ).label='[30.2731088, 77.9997088]';  
g.node(1  ).label='[30.2731188, 77.9997188]';  
g.node(101).label='[30.2731101, 77.9997101]';  
g.node(201).label='[30.2731201, 77.9997201]';  
g.node(301).label='[30.2731301, 77.9997301]';  
g.node(401).label='[30.2731401, 77.9997401]';  
g.node(501).label='[30.2731501, 77.9997501]';  
g.node(530).label='[30.2731530, 77.9997530]';  
g.node(503).label='[30.2731503, 77.9997503]';  
g.node(504).label='[30.2731504, 77.9997504]';  
g.node(505).label='[30.2731505, 77.9997505]';  
g.node(506).label='[30.2731506, 77.9997506]';  
g.node(507).label='[30.2731507, 77.9997507]';  
g.node(508).label='[30.2731508, 77.9997508]';  
g.node(509).label='[30.2731509, 77.9997509]';  
g.node(510).label='[30.2731510, 77.9997510]';  
g.node(511).label='[30.2731511, 77.9997511]';  
g.node(531).label='[30.2731531, 77.9997531]';  
// testing above 



var src =0,des=531;
var dijkstra = new Dijkstra(g, src);
let res='';
// console.log(dijkstra.distanceTo(14))
// for(var v = 1; v < g.V; ++v){
    if(dijkstra.hasPathTo(des)){
        var path = dijkstra.pathTo(des);
        console.log('=====path from 0 to ' + des + ' start==========');
        for(var i = 0; i < path.length; ++i) {
            var e = path[i];
            console.log(e.from() + ' => ' + e.to() + ': ' + e.weight);
            console.log(g.node(e.from()).label);
            res=res+(g.node(e.from()).label)+',\n';
        }
        console.log(res);
        console.log('distance from '+ src +' to '+ des +' => ' + dijkstra.distanceTo(des) );
    }
// }