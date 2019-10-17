var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({ extended: true });
var kirjaapi = require('./service/kirjaAPI');

app.use(bodyParser.json()); // support json encoded bodies
const logger = require('morgan');
//app.use(logger('dev'));

// Set default CORS values to headers, including
// Access-Control-Allow-Origin: *
var cors = require('cors');
app.use(cors());

// Define the REST service address with the router
app.use('/api/kirjat', kirjaapi);
// Where to service the static files from
app.use(express.static('files'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next({status: 404, message: "Not Found"});
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.message);
});

module.exports = app;
