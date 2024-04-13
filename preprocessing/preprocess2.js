import {readFile,readFileSync,write,writeFile} from 'fs';

let currnode = 1 ;
let node =  [];
let edges = [];
let ans = []

let assignnode = () => {
    edges.forEach(element => {
        for(let i = 0;i<element.length-1;i++){
            // ans.push({ "start": element[i], "end": element[i+1]});
            // console.log(element[i][0].toString(),element[i][1].toString())
            let start,end;
            node.forEach(nodes=>{
                if(nodes.long === element[i][0].toString() && nodes.lat === element[i][1].toString()){
                    start = nodes.node;
                }
                else if(nodes.long === element[i+1][0].toString() && nodes.lat === element[i+1][1].toString()){
                    end = nodes.node;
                }
            })
            if(!start){
                node.push({"node":currnode, "lat": element[i][0].toString(), "long":element[i][1].toString(),"floor": "0" ,"note":""});
                start = currnode;
                currnode++;
            }
            if(!end){
                node.push({"node":currnode, "lat": element[i][0].toString(), "long":element[i][1].toString(),"floor": "0" ,"note":""});
                end = currnode;
                currnode++;
            }
            console.log({ "start": start, "end": end});
            ans.push({ "start": start, "end": end});
            // console.log({ "start": element[i], "end": element[i+1]});
        }
    });
    // console.log(node)
    save();
}

readFile('preprocessing/Ground floor test_plan.geojson', 'utf8',(err,data,floor=0,note="")=>{
    if(err){
        console.log(err);
    }
    else{
        let map_coordinates_label = JSON.parse(data).features;
        map_coordinates_label.forEach(element => {
            if(element.geometry.type === 'Point'){
                let spilit = element.geometry.coordinates;
                node.push({"node":currnode, "lat": spilit[1].toString(), "long":spilit[0].toString(),"floor":floor.toString() ,"note":note});
                currnode++;
            }
            else if(element.geometry.type === 'LineString'){
                edges.push(element.geometry.coordinates)
            }
        });
    }
    // console.log("========================xxxxxxxxxxxxx==================");
    // console.log(edges);
    // console.log("========================xxxxxxxxxxxxx==================");
    // console.log(node);
    assignnode();
});
function save(){
    const reconstructedJson = JSON.stringify(ans, null, 2);
    writeFile('preprocessing/aaaaaaaaaaaaaaaaaaaaaa.json', reconstructedJson, 'utf8', err => {
        if (err){
            console.error("Error writing file:", err);
            return;
        } else {
            console.log("File saved.");
        }
    });
    const reconstructedJson2 = JSON.stringify(node, null, 2);
    writeFile('preprocessing/aaaaaaaaaaaaaaaaaaaaaa2.json', reconstructedJson2, 'utf8', err => {
        if (err){
            console.error("Error writing file:", err);
            return;
        } else {
            console.log("File saved.");
        }
    });
}