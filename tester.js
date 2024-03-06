import jsgraphs from 'js-graph-algorithms';
import {g} from './newmap.js'

let dijfunc2 = (src,des) =>{
    var dijkstra = new jsgraphs.Dijkstra(g, src);
    let e;
    if(dijkstra.hasPathTo(des)){
        let res = [[],[],[],[],[],[],[]];
        var path = dijkstra.pathTo(des);
        let curr_floor =0;
        let temp_con=[];
        for(var i = 0; i < path.length; ++i){
            e = path[i];
            let temp = (g.node(e.from()).label).split(','); 
            if(i==0){
                curr_floor = temp[2];
            }
            let temparr = []
            if(i!=path.length -1){
                temparr.push(Number(temp[0]));
                temparr.push(Number(temp[1]));
                if(temp[2]==curr_floor){
                    temp_con.push(temparr)
                }
                else{
                    res[curr_floor].push(temp_con);
                    temp_con=[]
                    temp_con.push(temparr)
                    curr_floor=temp[2];
                }
            }
            else if(i==path.length -1){
                let temp = (g.node(e.to()).label).split(','); 
                let temparr = []
                temparr.push(Number(temp[0]));
                temparr.push(Number(temp[1]));
                temp_con.push(temparr)
                res[curr_floor].push(temp_con);
            }
        }
        return res;
    }
    else{
        console.log('error hai bhaisaab service down hai shayad');
    }
}
let res = dijfunc2(1001, 1127);
console.log(res);