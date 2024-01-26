import jsgraphs from 'js-graph-algorithms';

var g = new jsgraphs.WeightedDiGraph(5);
g.addEdge(new jsgraphs.Edge(0  , 1 , 2)); 
g.addEdge(new jsgraphs.Edge(1  , 2 , 2)); 
g.addEdge(new jsgraphs.Edge(2  , 3 , 2)); 

g.node(0).label='30.2731289,77.9997726';  
g.node(1).label='30.2732541,77.9998359';  
g.node(2).label='30.2733582,77.9999662';  
g.node(3).label='30.2734329,78.0001123';  
 
var dijkstra = new jsgraphs.Dijkstra(g, 0);
let e;
for(var v = 0; v < g.V; ++v){
    if(dijkstra.hasPathTo(v)){
        let res =  [];
        var path = dijkstra.pathTo(v);
        console.log('===================================');
        console.log('path from 0 to ' + v );
        for(var i = 0; i < path.length; ++i) {
            e = path[i];
            console.log(e.from() + ' => ' + e.to() + ': ' + e.weight);
            
            let temp = (g.node(e.from()).label).split(','); 
            
            console.log(temp);
            let temparr = []
            temparr.push(Number(temp[0]));
            temparr.push(Number(temp[1]));
            res.push(temparr)
            // if(i==path.length -1){
            //     res = res + g.node(e.to()).label;
            // }
        }
        // const points = [[30.2731289, 77.9997726],[30.2732541, 77.9998359],[30.2733582, 77.9999662],[30.2734329, 78.0001123]];
        // const polytile = L.polyline(arr).addTo(map);
        console.log(res);
        // let arr = res.split("@");
        // console.log(arr);
        console.log('distance: '  + dijkstra.distanceTo(v));
        console.log('===================================');
    }
}

const points = [[30.2731289, 77.9997726],[30.2732541, 77.9998359],[30.2733582, 77.9999662],[30.2734329, 78.0001123]];
console.log(typeof(points[0][0]))
