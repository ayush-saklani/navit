import jsgraphs from 'js-graph-algorithms';

var g = new jsgraphs.WeightedDiGraph(5);
g.addEdge(new jsgraphs.Edge(0  , 1 , 2)); 
g.addEdge(new jsgraphs.Edge(1  , 2 , 2)); 
g.addEdge(new jsgraphs.Edge(2  , 3 , 2)); 

g.node(0).label='30.2731289,77.9997726';  
g.node(1).label='30.2732541,77.9998359';  
g.node(2).label='30.2733582,77.9999662';  
g.node(3).label='30.2734329,78.0001123';  

    let dijfunc = (src,des) =>{
        var dijkstra = new jsgraphs.Dijkstra(g, src);
        let e;
        if(dijkstra.hasPathTo(des)){
            let res = [];
            var path = dijkstra.pathTo(des);
            for(var i = 0; i < path.length; ++i) {
                e = path[i];
                let temp = (g.node(e.from()).label).split(','); 
                let temparr = []
                temparr.push(Number(temp[0]));
                temparr.push(Number(temp[1]));
                res.push(temparr)
                if(i==path.length -1){
                    let temp = (g.node(e.to()).label).split(','); 
                    let temparr = []
                    temparr.push(Number(temp[0]));
                    temparr.push(Number(temp[1]));
                    res.push(temparr)
                }
            }
            return res;
        }
        else{
            console.log('error hai bhaisaab service down hai mijan');
        }
    }
    let res = dijfunc(0,3);
    console.log(res);
// const points = [[30.2731289, 77.9997726],[30.2732541, 77.9998359],[30.2733582, 77.9999662],[30.2734329, 78.0001123]];
// console.log(typeof(points[0][0]))
