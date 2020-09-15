// globals
const express = require('express');
const app = express();
// const pg = require('pg');    //not needed?
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000; // const PORT = process.env.PORT || 5000;
const taskRouter = require('./routes/taskrouter');


// uses
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// routes
app.use('/tasks', taskRouter);

// start listening for requests
app.listen(port, ()=>{
    console.log(`This is Dr. Mantis Toboggan, M.D. on ${port}`);
});