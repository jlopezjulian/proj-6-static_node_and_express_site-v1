/**
 * Treehouse FSJS Techdegree
 * Project 6 - Static Node.js and Express Site
 */


/**
 * Setting up server, routes and middleware
 */

//setting up express, referencing Treehouse video "Creating a Server in Express" 1:32
const express = require('express');
const app = express();

const { projects } = require('./data.json'); //connecting to json file

app.set('view engine', 'pug'); //middleware is set up -- set up view engine to pug
app.use('/static', express.static('public'));  //static route to serve the files located in public folder

// /**
//  * "Index" route to render the Home page, next is added to signal end of function (https://teamtreehouse.com/library/using-next-and-handling-errors)
//  */
app.get('/', (req, res, next) => {
    res.render('index', { projects });
});

// /**
//  * "About" route to render the About page
//  */

app.get('/about', (req, res, next) => {
    res.render('about');
});

// /**
//  * Project Page Routes
//  * based on the id of the project that render a customized version of the pug proj
//  */

app.get("/projects/:id", (req, res, next) => {
    const id  = req.params.id;
    const project = projects[id];
    if (project) {
        res.render('project', { project });
    }else{
        next();
    }
    })


// /**
//  * Error Handler
//  */

app.use((req, res, next) =>{
    // console.log('404 error');
    const err = new Error("Sorry, page not found"); //setting a status property to 404
    err.status = 404; //handling 404 errors: https://teamtreehouse.com/library/handling-404-errors#downloads
    next(err)
    });

  //global error handling
app.use((err, req, res, next) => {
    // res.local.error = err;
    console.error(err.stack);
    res.status(err.status || 500)
    res.send('Whoops, something needs fixing!');
    })



//   /*
//    * Setting up the port
//    */

 app.listen(3000, () => {
     console.log('This app is listening on port 3000');
 })
