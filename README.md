# **Indoor Mapping Navit ( Gamma γ )** <img src="assets/images/logo.png" height="105" align="left"/>

**Indoor mapping solution for University campus. _(currently more than proof of concept phase a little less than completed)_**

# **Coding Language and Tools**

<p align="left">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" height="70"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" height="70"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" height="70"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" height="70"/>
<img src="https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png"height="70"/>
<img src="https://adware-technologies.s3.amazonaws.com/uploads/technology/thumbnail/20/express-js.png" height="70"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" height="70"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Openstreetmap_logo.svg"height="70"/> 
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Leaflet_logo.svg/1280px-Leaflet_logo.svg.png" height="70"/>
</p>

# **How to run this project ?**

1. Run `server.js` **(server side)**.
2. Now run the website and enjoy.
3. Ensure all required modules and installed, _(use the latest npm Modules from [here](https://www.npmjs.com/)) or using the commands below._

```code
npm install js-graph-algorithms
npm install express --save
npm install cors
```

# **File Structure**

- **_[package.json](package.json)_** **- npm packages**
- **_[package-lock.json](package-lock.json)_** **- npm packages**
- **_[README.md](README.md)_** **- Readme.md file**
- **_[roomid_status.json](roomid_status.json)_**
- **_[server2.js](server2.js)_** **- Node-express-server that act as backend and fetch data**
- **_[style.css](style.css)_** **- Cascading style sheets for frontend**
- **_[assets](assets)_** **- Images and GeoJSON related to project**
- **_[misc](misc)- Miscellanous files and functions testing files**
- **_[node_modules](node_modules)_** **- Node Modules installed here in this folder [ some are non necessary but are for testing purposes ]**
- **_[index.html](index.html)_** **- Front end [ HTML ]**
- **_[index.js](index.js)_** **- Front end [ JS ]**
- **_[index_frontend.js](index_frontend.js)_** **- Front end [ JS ]**
- **_[map_coordinates.json](map_coordinates.json)_** **- Master Map Nodes stored here**
- **_[map_coordinates_label_updated.json](map_coordinates_label_updated.json)_** **- Master Map Labels stored here**

<!--  -->
<!-- # Future plan -->
<!-- * Make it dynamic to add coordinate to center use last coordinate to center -->
<!-- * Add routes using geojson and calculate the shortest path using djkastra data structure typed modules -->
<!-- * Use leaflet library for drawing route on map using polylines dynamically using coordinates as array of strings input -->
<!-- * Introduce database to store timetables and current cooordinates to center -->
<!-- * Add timetables to database to automate the direction finding and to find idle class rooms and labs -->
<!-- * Add authencation for students to verify the actual user and possibally Lock the mapping part within campus for safety concern -->
<!--  -->
<!--  -->
<!-- # -->
<!-- ### *(done)* -->
<!-- * we can do one thing  -->
<!-- * we can make a array of floors for show the polylines floor wise -->
<!-- * 7 floors so the length of array will be 7 -->
<!-- * and each will contain that array containing the coordinates of that floor and we will make  -->
<!-- * the polyline according to the floor  -->
<!-- # -->
<!-- * 0 means ground floor and 7 means underground  -->
<!-- * g.node(0).label='30.2731289,77.9997726,1'; this will be new type of node label, by this we will  get the latitude ,longitude and floors from this -->
<!-- * shove all the fetch request in the server.js side for privacy -->
<!-- # -->
<!-- # **Keep Coding, Keep Smiling!, Have Fun!** 💻🚀 -->
