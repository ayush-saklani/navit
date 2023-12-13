# navit

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