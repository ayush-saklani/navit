# **Indoor Mapping Navit (Alpha(α))**    <img src="media/logo.png" height="100" align="left"/>
**Indoor mapping solution for University campus. *(currently more than proof of concept phase)***
 
# **Coding Language and Tools Used**
<p align="left">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" height="60"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" height="60"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" height="60"/>
<img src="https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png"height="60"/>
<img src="https://adware-technologies.s3.amazonaws.com/uploads/technology/thumbnail/20/express-js.png" height="60"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" height="60"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Openstreetmap_logo.svg"height="60"/> 
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Leaflet_logo.svg/1280px-Leaflet_logo.svg.png" height="60"/>
</p>

# **How to run this project ?** 

1. Run `server.js` (server side).
2. Now run the website and enjoy.
3. Ensure all required modules and installed, *(use the latest npm Modules from [here](https://www.npmjs.com/)) or using the commands below.*


```code
npm install js-graph-algorithms
npm install express --save
npm install cors
```

# File Structure
* `index.js` Backend file for web page.
* `server.js` Server file for serving post request. 
* `index.html` Webpage HTML page.
* `ogmap.geoJSON` is ground floor campus map. 
* `qr_testing.xlsx` For QR codes making and distance calculation testing using lattitude and longitude. 
* `map.js` Contains the map. 
* `package.JSON` and `package-lock.JSON` has npm packages for this project
* `test.js` is for testing *(can be deleted)*.
* `tester.js` is for testing *(can be deleted)*.


# updates
* Basement floor updated version added with workshop.
* All floor updated acuurately.

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
<!--  -->
<!-- * `server.js` -->
<!-- * `style.css` -->
<!-- * `test.js` -->
<!-- * `tester.js` -->
<!-- * `.vscode` -->
<!-- * `api` -->
<!-- * `cache` -->
<!-- * `mapgeoJSON` -->
<!-- * `media` -->
<!-- * `node_modules` -->
<!-- * `.gitignore` -->
<!-- * `index.html` -->
<!-- * `index.js` -->
<!-- * `newmap.js` -->
<!-- * `oneness.js` -->
<!-- * `package.json` -->
<!-- * `package-lock.json` -->
<!-- * `qr_testing.xlsx` -->
<!-- * `README.md` -->