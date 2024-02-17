# **Indoor Mapping Navit**    <img src="media/logo.png" height="100" align="left"/>
**Indoor mapping solution for University campus.**

# **Coding Language and Tools Used**
<p align="left">

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" width="60" height="60"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" width="60" height="60"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="60" height="60"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" width="60" height="60"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" width="60" height="60"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" width="60" height="60"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Openstreetmap_logo.svg"height="60"/> 
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Leaflet_logo.svg/1280px-Leaflet_logo.svg.png" height="60"/>
</p>
          


# **How to run this project ?** 

1. Open Jupyter notebook and run the program.
2. After running, you will have 2 pickle files.
3. Run `apptest.py` using the command mentioned in the first line of code.
4. Ensure all required libraries, especially Streamlit, are installed *(use the latest pip libraries from [here](https://pypi.org/)).*


```code
pip install numpy
pip install pandas
pip install scikit-learn
pip install nltk
pip install pickle5
```
#


# **Keep Coding, Keep Smiling!, Have Fun!** 💻🚀



* a.js is main file backend for web page 
* index.html is for webpage
* og map.geoJSON is ground floor campus map
* mapgg.geoJSON is copy of og map.geoJSON for experimentaion 
##
* excel is for qr codes
* index.mjs is containing map backend 
* map.js has map nodes
##
* package.JSON and package-lock.JSON are npm packages for index.mjs
* test.js is for testing features (can be deleted)

## resources
* https://https//www.npmjs.com/package/leaflet?activeTab=readme%20%20%20
* https://leafletjs.com/reference.html#polyline
## further plan
* make it dynamic to add coordinate to center use last coordinate to center
* add routes using geojason and calcute the shortest path using djkastra data structure typed modules
* use leaflet library for drawing route on map using polylines dynamically using coordinates as array of strings input
* introduce database to store timetables and current cooordinates to center
* add timetables to database to automate the direction finding and to find idol class rooms
* add authencation for students to verify the actual user and possibally geotag the mapping part for safety concern