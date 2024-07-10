import {readFile,writeFile} from 'fs';
let gg;
const writeing = () =>{
    const reconstructedJson = JSON.stringify(gg, null, 2);
    writeFile('test.geojson', reconstructedJson, 'utf8', err => {
        if (err) {
            console.error("Error writing file:", err);
            return;
        } else {
            console.log("File saved.");
        }
    });
}
const plusone = () =>{
    readFile('floor3.geojson','utf8',(error,data)=>{
        if(error) console.log(error);
        else{
            gg = JSON.parse(data);
            let temp = gg.features;
            temp.forEach(element => {
                if(element.properties && element.properties.room_id){
                    if(element.properties.room_id === "999" || element.properties.room_id === "998"){

                    }
                    else{
                        element.properties.room_id = eval(element.properties.room_id) + 2000;
                    }
                }
            });
        }
        writeing()       
    })
}
plusone();