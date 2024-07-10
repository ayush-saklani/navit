import { writeFile } from 'fs';
let arr = ["1","3","6","15","25","28","29","31","33","36","41","51","52","54","56","57","69","71","73","75","83","85","87","89","91","99","101","105","127","148","165","166","171","998","999","1001","1003","1006","1017","1025","1028","1029","1031","1033","1036","1041","1051","1052","1056","1057","1069","1071","1073","1075","1083","1085","1087","1089","1091","1099","1101","1119","1122","1127","2001","2006","2017","2025","2028","2029","2031","2033","2036","2041","2051","2052","2056","2057","2069","2071","2073","2075","2083","2085","2087","2089","2099","2101","2119","2122","3001","3002","3006","3025","3028","3029","3031","3033","3036","3041","3051","3052","3056","3057","3069","3071","3073","3075","3083","3085","3087","3089","3091","3099","3101","3119","3122","4006","4017","4025","4028","4029","4031","4033","4036","4041","4051","4052","4056","4057","4069","4075","4083","4085","4087","4089","4099","4101","5003","5006","5017","5025","5028","5029","5031","5033","5036","5041","5051","5052","5056","5057","5069","5071","5073","5075","5083","5085","5087","5089","5099","5101","5119","6004","6006","6015","6017","6073","6085","6091","6118","6122","6173","6177","6190","6191"]
function save_JSON(){
    const reconstructedClassData = [];
    arr.forEach(element => {
        reconstructedClassData.push({
            "room_id": element,
            "schedule": {
              "mon": {
                "08-09": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "09-10": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "10-11": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "11-12": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "12-01": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "01-02": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "02-03": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "03-04": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "04-05": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "05-06": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null}
              },
              "tue": {
                "08-09": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "09-10": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "10-11": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "11-12": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "12-01": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "01-02": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "02-03": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "03-04": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "04-05": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "05-06": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null}
              },
              "wed": {
                "08-09": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "09-10": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "10-11": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "11-12": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "12-01": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "01-02": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "02-03": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "03-04": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "04-05": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "05-06": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null}
              },
              "thu": {
                "08-09": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "09-10": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "10-11": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "11-12": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "12-01": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "01-02": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "02-03": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "03-04": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "04-05": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "05-06": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null}
              },
              "fri": {
                "08-09": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "09-10": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "10-11": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "11-12": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "12-01": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "01-02": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "02-03": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "03-04": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "04-05": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "05-06": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null}
              },
              "sat": {
                "08-09": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "09-10": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "10-11": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "11-12": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "12-01": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "01-02": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "02-03": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "03-04": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "04-05": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "05-06": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null}
              },
              "sun": {
                "08-09": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "09-10": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "10-11": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "11-12": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "12-01": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "01-02": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "02-03": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "03-04": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "04-05": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null},
                "05-06": { "course":"","section":"","semester":null,"slotdata":"","teacher_ID":null}
              }
            }
          });
    });
    const reconstructedJson = JSON.stringify(reconstructedClassData, null, 2);
    writeFile('test.json', reconstructedJson, 'utf8', err => {
        if (err) {
            console.error("Error writing file:", err);
            return;
        } else {
            console.log("File saved.");
        }
    });
}
save_JSON();