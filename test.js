import jsgraphs from 'js-graph-algorithms';

var g = new jsgraphs.WeightedDiGraph(5);
g.addEdge(new jsgraphs.Edge(0  , 1 , 2)); 
g.addEdge(new jsgraphs.Edge(1  , 2 , 2)); 
g.addEdge(new jsgraphs.Edge(1  , 4 , 2)); 
g.addEdge(new jsgraphs.Edge(2  , 3 , 2)); 
g.addEdge(new jsgraphs.Edge(4  , 3 , 2)); 

g.node(0).label='[30.2731188, 77.9997188]';  
g.node(1).label='[30.2731188, 77.9997188]';  
g.node(2).label='[30.2731201, 77.9997201]';  
g.node(3).label='[30.2731101, 77.9997101]';  
g.node(4).label='[30.2731088, 77.9997088]';  
 
var dijkstra = new jsgraphs.Dijkstra(g, 0);
let e;
for(var v = 0; v < g.V; ++v){
    if(dijkstra.hasPathTo(v)){
        let res = '';
        var path = dijkstra.pathTo(v);
        console.log('===================================');
        console.log('path from 0 to ' + v );
        for(var i = 0; i < path.length; ++i) {
            e = path[i];
            console.log(e.from() + ' => ' + e.to() + ': ' + e.weight);
            res = res + g.node(e.from()).label + '@'
            if(i==path.length -1){
                res = res + g.node(e.to()).label;
            }
        }
        console.log(res);
        let arr = res.split("@");
        console.log(arr);
        console.log('distance: '  + dijkstra.distanceTo(v));
        console.log('===================================');
    }
}
