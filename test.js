let a = 12.34567891
let b = 98.76543219
console.log(a*100000000);
console.log(b/100);
let c = ((a*10000000)+((b /100).toPrecision(10)));
console.log(c);

let d = Math.floor(c) 
let e = (c+"").split(".")[1];
console.log(d);
console.log(e);


