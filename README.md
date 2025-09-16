# **Indoor Mapping - *Navit* ( v2.1 )** <img src="assets/images/logo.png" height="110" align="left"/>

**Navit is an indoor mapping solution made for University or any other big campus.**

---
# **Languages, Frameworks and Tools**
<div align="left" style="margin: 10px;">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" height="75"/>     
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" height="75"/>
<img src="https://devicon-website.vercel.app/api/nodejs/original.svg"height="75"/>
<img src="https://devicon-website.vercel.app/api/express/original.svg?color=%23FFFFFF"height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg" height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg"height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original-wordmark.svg" height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" height="75"/>
<img src="./assets/images/vercel-logo.png"height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" height="75"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg"height=75/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-plain.svg" height="75"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Openstreetmap_logo.svg" height="75"/> 
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Leaflet_logo.svg/1280px-Leaflet_logo.svg.png" height="75"/>
</p>

# How to run this project
- **Backend ( NodeJS ) -** `/backend` `npm install` `npm start` ***( starts the server )***
- **Frontend ( ReactJS ) -** `/frontend-react` `npm install` `npm run dev` or <a class="link-danger" href="https://navit.vercel.app/"><b>Navit</b></a>

# License
**This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License](http://creativecommons.org/licenses/by-nc/4.0/).**

If you would like to use this project for commercial purposes, please contact the author for permission.

# Contributing
Contributions are welcome! If you'd like to contribute to this project, please fork the repository, create a pull request, and ensure your changes align with the non-commercial intent of the license.

# Disclaimer
This software is provided "as-is," without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement. Use at your own risk.


# ⭐ Current Ideas and Features for Development

## Version 1.0  ✅
- [x] Started with a problem in mind and the problem unveiled and changes the significant app fundamental approaches to solve the problem and new approaches were used. 
- [x] Route Management - Add routes using GeoJSON and calculate the shortest path using Dijkstra's algorithm and appropriate data structures.
- [x] Dynamic Floor Polylines - Create an array of floors to show the polylines floor-wise. Each array element will contain coordinates for that specific floor to create the polyline accordingly.                
___~~(Floor numbering: 0 for ground floor, 1 for first floor and 6 for underground).~~___
- [x] Implement basic functionality for routing.
- [x] Data Structure design and Implementation
- [x] Complete UI Design and improvements.
- [x] Complete Map were Designed in GeoJSON and later improvements were made.
- [x] Complete Routes were Designed in GeoJSON and later improvements were made.
- [x] Utilize the Leaflet library to draw routes on the map with polylines, dynamically using coordinates as an array of strings input.
## Version 1.1 ✅
- [x] Fetch Requests - Move all fetch requests to `server.js` for privacy and security.
- [x] Basic API Design and Implementation.
- [x] Automate direction finding and identify idle classrooms and labs by storing timetables in the database _**(Possible API integration with class-sync)**_.
- [x] ___Floor numbering changed for ease: 0 for underground floor, 1 for ground floor and so on.___ 🟢
- [x] Dynamic Centering - setting dynamic center by using cookies to add coordinates to center. Use the last coordinate to determine the center.
- [x] Database Integration - Introduce a database to store custom maps and routes.
- [ ] _~~Possibly restrict mapping functionalities to within the campus IP or network for safety concerns~~_ **_(cancelled or postponed indefinitely)_**
## Version 2.0 ✅
- [x] *Code Migration* - Migration of code into ReactJS completely 
- [x] **Class-sync** - Integration of Class-sync APIs with Navit.
## Version 2.1 ⌛ *( Currently Under Development )*
- [x] __Authentication and Security__ - Implement SigIn/SignUp authentication for students to verify users. _(temporary guest mode is also for project showcase)_
- [x] __QR code support__ - Now QR codes can be set in the campus which can be used in the app. This can also be utilized by the clubs and department for event advertisement.
- [ ] __React Native__ - Analyze the benefits and scope of code Migration in React Native. 
## **Keep Coding, Keep Smiling!, Have Fun!** 💻🚀
