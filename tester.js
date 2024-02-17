// server.js

import express from 'express';
const app = express();
const port = 3000;

// Define a route that responds with coordinates
app.get('/coordinates', (req, res) => {
    // In a real scenario, you would fetch coordinates from a database or another source
    const coordinates = { latitude: 30.2734504, longitude: 77.9997427 };
    res.json(coordinates);
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


// import express from 'express';
// const app = express();

// // Sample coordinates data
// const coordinates = {
//     0: [[30.2731289, 77.9997726],[30.2732541, 77.9998359],[30.2733582, 77.9999662],[30.2734329, 78.0001123]],
//     1: [[31.2731289, 76.9997726],[31.2732541, 76.9998359],[31.2733582, 76.9999662],[31.2734329, 77.0001123]],
//     // Add more coordinates for different requests
// };

// // Endpoint to handle requests for coordinates
// app.get('/', (req, res) => {
//   console.log("request aayi hai ")
//     const id = req.params.id;
//     const coords = coordinates[id];
//     if (coords) {
//         res.json(coords);
//     } else {
//         res.status(404).json({ error: 'Coordinates not found' });
//     }
// });

// // Start the server
// const port = 5500;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });



// import express from 'express'
// const app = express()
// const port = 5500

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })