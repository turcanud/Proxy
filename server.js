const express = require('express');
// const Redis = require('redis');

// const {
//     client,
//     getAllEmployees,
//     insertEmployee,
//     getEmployeeById
// } = require('./database/cassandra.js');

// const redisClient = Redis.createClient();
// redisClient.connect();
// const DEFAULT_EXPIRATION = 3600;

// client.connect().then(() => {
//     console.log('Cassandra client connected');
// }).catch(error => {
//     console.error('Error connecting to Cassandra:', error);
// });

const app = express();
// app.use(express.json());

const app_name = process.env.APP_NAME;

app.get('/', (req, res) => {
    res.json({ "message": `Request served by node ${app_name}` });
    console.log(`Request served by node {app_name}`);
});

// app.get("/employees", async (req, res) => {
//     const employees = await getOrSetCache('employees', async () => {
//         const data = await getAllEmployees();
//         return data;
//     });
//     return res.json(employees);
// });

// app.get("/employee/:id", async (req, res) => {
//     const employees = await getOrSetCache(`employee:${req.params.id}`, async () => {
//         const data = await getEmployeeById(req.params.id);
//         return data;
//     });
//     return res.json(employees);
// });

// app.post("/employee/create", async (req, res) => {
//     const { name, email } = req.body;

//     if (!name || !email) {
//         return res.status(400).json({ error: "Name and email are required." });
//     }

//     try {
//         const result = await insertEmployee(name, email);
//         return res.status(201).json(result);
//     } catch (err) {
//         console.error(err.message);
//         return res.status(500).json({ error: "Failed to create employee." });
//     }
// });


// process.on('SIGINT', async () => {
//     console.log('Shutting down server...');
//     await redisClient.quit();
//     console.log('Redis client disconnected');
//     await client.shutdown();
//     console.log('Cassandra client disconnected');
//     process.exit(0);
// });

// async function getOrSetCache(key, cb) {
//     try {
//         const data = await redisClient.get(key);
//         if (data != null) {
//             return JSON.parse(data);
//         }
//         const freshData = await cb();
//         await redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
//         return freshData;
//     } catch (error) {
//         console.error('Error in getOrSetCache:', error);
//         throw error;
//     }
// }

app.listen(3000, () => {
    console.log(`{app_name} Server is running on port 3000`);
});
