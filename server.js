const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

hbs.registerPartials(__dirname+'/views/partials');
var app=express();
app.set('view engine','hbs');


app.use(function (request,response,next) {          //registering middleware
    var now=new Date().toString();
    var log=`${now} ${request.method},${request.url}`;
    fs.appendFile('server.log',log+'\n',function (err) {
        if (err){ console.log(err);}
    });
    next();
});

// app.use are executed in the order in which they are placed, first come first execute.
app.use(function (request,response,next) {
    response.render('maintenence.hbs');
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',function () {
   return new Date().getFullYear()
});

app.get('/about',function (request,response) {
    response.render('about.hbs',{
        pageTitle:"About Page"
    });
});

app.get('/',function (request,response) {
   response.render('Home.hbs',{
       WelcomeMessage:"Welcome to the Website.",
       pageTitle:"Home page"
   });
});
app.listen(3000);