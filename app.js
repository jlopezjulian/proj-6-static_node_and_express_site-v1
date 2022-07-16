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
//  */

 app.get("/projects/:id", (req, res, next) => {
    const id = req.params.id;
    const project = projects[id];
    if (project) {
        res.locals.data = projects;
        return res.render('project', { project });
    } else {
        const err = new Error();
        err.status = 404;
        err.message = "Sorry, this page does not exist"
        next(err);
    }
});

// /**
//  * Error Handler
//  */

app.use(( req, res, next) =>{
    const err = new Error("Sorry, page not found");
    err.status = 404;
    next(err)
    });

  //global error handling
app.use((err, req, res, next) => {
      console.error(err.stack)
      res.status(err.status || 500 ).send('Whoops, something needs fixing!');
    })



//   /*
//    * Setting up the port - Port number can be changed in const variable at the top
//    */

 app.listen(3000, () => {
     console.log('This app is listening on port 3000');
 })
