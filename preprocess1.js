import {readFile,writeFile} from 'fs';
let mapmap={};
const reconstructedClassData = [];
let loadMap = () =>{
    readFile('map_coordinates_label_updated.json', 'utf8',(err,data)=>{
        if(err){
            console.log(err);
        } 
        else{
            let map_coordinates_label = JSON.parse(data);
            map_coordinates_label.forEach(obj => {
                mapmap[obj.node] = obj;
            });
            edit_kardo();
            console.log(mapmap);
        }
    });
}
let edit_kardo = () =>{
    readFile('map_coordinates_edit.json', 'utf8',(err,data)=>{
        if(err){
            console.log(err);
        } 
        else{
            let map_coordinates = JSON.parse(data);
            map_coordinates.forEach(obj => {
                // mapmap[obj.start].lat = obj;
                if(obj.len>=10){
                    reconstructedClassData.push({ "start": obj.start, "end": obj.end, "len": obj.len });
                    // console.log("================================xx==============================")
                }else{
                    console.log(obj.start,obj.end,obj.len,haversine(mapmap[obj.start].lat,mapmap[obj.start].long,mapmap[obj.end].lat,mapmap[obj.end].long));
                    obj.len = haversine(mapmap[obj.start].lat,mapmap[obj.start].long,mapmap[obj.end].lat,mapmap[obj.end].long)
                    reconstructedClassData.push({ "start": obj.start, "end": obj.end, "len": obj.len });
                }
            });
            save_JSON();
        }
    });
}
function save_JSON(){
    // reconstructedClassData = [];
    // for (const forg in mapmap) {
    //     reconstructedClassData.push({ "start": 6070, "end": 6172, "len": 6.08 });
    // }
    const reconstructedJson = JSON.stringify(reconstructedClassData, null, 2);
    writeFile('map_coordinates_edit.json', reconstructedJson, 'utf8', err => {
        if (err){
            console.error("Error writing file:", err);
            return;
        } else {
            console.log("File saved.");
        }
    });
}
let haversine = (lat1, lon1, lat2, lon2) =>{
    lat1 = lat1 * (Math.PI / 180);
    lon1 = lon1 * (Math.PI / 180);
    lat2 = lat2 * (Math.PI / 180);
    lon2 = lon2 * (Math.PI / 180);
    let c = Math.pow(Math.sin(Math.abs(lat1-lat2)/2),2)+Math.cos(lat1)*Math.cos(lat2)*Math.pow(Math.sin(Math.abs(lon1-lon2)/2),2);
    let res = 2*Math.asin(Math.sqrt(c))*6371*1000;
    return res;
}
loadMap();