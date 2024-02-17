# **Indoor Mapping Navit (Beta)**    <img src="media/logo.png" height="100" align="left"/>
**Indoor mapping solution for University campus. *(currently in the proof of concept phase)***
 
# **Coding Language and Tools Used**
<p align="left">

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" width="60" height="60"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" width="60" height="60"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="60" height="60"/>
<img src="https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png"height="60"/>
<img src="https://adware-technologies.s3.amazonaws.com/uploads/technology/thumbnail/20/express-js.png" width="60" height="60"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" width="60" height="60"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Openstreetmap_logo.svg"height="60"/> 
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Leaflet_logo.svg/1280px-Leaflet_logo.svg.png" height="60"/>
</p>

# **How to run this project ?** 

1. Run `function_testing.js` (server side).
2. Now run the website and enjoy.
3. Ensure all required modules and installed,*(use the latest npm Modules from [here](https://www.npmjs.com/)) or run commands below.*


```code
npm install js-graph-algorithms
npm install express --save
npm install cors
```

# File Structure
* `index.js` Backend file for web page 
* `index.html` Webpage
* `ogmap.geoJSON` is ground floor campus map 
* `qr_testing.xlsx` For QR codes making and distance calculation testing using lattitude and longitude 
* `map.js` Contains the map 
* `package.JSON` and `package-lock.JSON` has npm packages for this project
* `test.js` is for testing (can be deleted)

# Future plan
* Make it dynamic to add coordinate to center use last coordinate to center
* Add routes using geojson and calculate the shortest path using djkastra data structure typed modules
* Use leaflet library for drawing route on map using polylines dynamically using coordinates as array of strings input
* Introduce database to store timetables and current cooordinates to center
* Add timetables to database to automate the direction finding and to find idle class rooms and labs
* Add authencation for students to verify the actual user and possibally Lock the mapping part within campus for safety concern

# **Keep Coding, Keep Smiling!, Have Fun!** 💻🚀