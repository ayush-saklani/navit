import pkg from 'js-graph-algorithms';
const { Graph,WeightedDiGraph, Edge, Dijkstra } = pkg;
import {g} from './map.mjs'

var src =0;
var dijkstra = new Dijkstra(g, src);
console.log(dijkstra.distanceTo(14))
for(var v = 1; v < g.V; ++v){
    if(dijkstra.hasPathTo(v)){
        var path = dijkstra.pathTo(v);
        console.log('=====path from 0 to ' + v + ' start==========');
        for(var i = 0; i < path.length; ++i) {
            var e = path[i];
            console.log(e.from() + ' => ' + e.to() + ': ' + e.weight);
        }
        console.log(dijkstra.distanceTo(v));

        console.log('distance from '+ src +' to '+ v +' => ' + dijkstra.distanceTo(v) );
        console.log('adasdasdasdss '+ src +' to '+ v +' => ' + dijkstra.pathTo(v)[0].to() );
    }
}
    