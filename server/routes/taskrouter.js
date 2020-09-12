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

// GET
taskRouter.get('/', (req, res)=>{
    let queryText = 'SELECT * FROM "tasks" ORDER BY "id" ASC;';
    pool.query(queryText).then(result => {
            // Sends back the results in an object
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error getting books', error);
            res.sendStatus(500);
        }); // end pool
}); // end server GET

// POST
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
        }); // end pool
}); // end server POST

// DELETE
taskRouter.delete('/:id', (req, res)=>{
    let id = req.params.id;
    console.log('Delete route called with id of', id);
    const queryString = `DELETE FROM "tasks" WHERE "id" = $1;`;
    pool.query(queryString, [id])
        .then((response)=>{
            console.log('deleted.');
            res.sendStatus(200);
        }).catch((error)=>{
            console.log('error in deleting task', error);
            res.sendStatus(418);
        }); // end pool
}); // end server DELETE

taskRouter.put('/:id', (req, res)=>{
    console.log('params', req.params.id, req.body);
    let queryString = `UPDATE "tasks" SET "completed" = TRUE WHERE "id" = $1;`;
    pool.query(queryString, [req.params.id])
    .then((result)=>{
        // console.log('result from PUT', result);
        res.sendStatus(200);
    }).catch((err)=>{
        console.log('error from PUT', err);
        res.sendStatus(500);
    }); // end pool
}); // end server PUT

module.exports = taskRouter;