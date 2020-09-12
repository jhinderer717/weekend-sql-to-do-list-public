const express = require('express');
const taskRouter = express.Router();

// database connection
const pg = require('pg');

const Pool = pg.Pool;
const pool = new Pool({
    database: "weekend-to-do-app",
    host: "localhost",
    port: 5432,
    max: 12,
    idleTimeoutMillis: 20000
});

taskRouter.get('/', (req, res)=>{
    let queryText = 'SELECT * FROM "tasks" ORDER BY "id" ASC;';
    pool.query(queryText).then(result => {
            // Sends back the results in an object
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error getting books', error);
            res.sendStatus(500);
        });
}); // end server GET

taskRouter.post('/', (req, res)=>{
    let newTask = req.body;
    console.log('adding task', newTask);

    let queryText = `INSERT INTO "tasks" ("description", "completed")
                    VALUES ($1, $2);`;
    pool.query(queryText, [newTask.description, newTask.completed])
        .then((result)=>{
            console.log('result from put', result);
            res.sendStatus(201);
        }).catch((error)=>{
            console.log('error adding new task', error);
            res.sendStatus(418); // I'm a teapot error?
        });
}); // end server POST

module.exports = taskRouter;