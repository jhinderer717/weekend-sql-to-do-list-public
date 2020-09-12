// globals
const express = require('express');
const app = express();
const pg = require('pg');
const bodyParser = require('body-parser');
const PORT = 4000; // const PORT = process.env.PORT || 5000;
const taskRouter = require('./routes/taskrouter');


// uses
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// routes
app.use('/tasks', taskRouter);

// start listening for requests
app.listen(PORT, ()=>{
    console.log('This is Dr. Mantis Toboggan, M.D.', PORT);
});