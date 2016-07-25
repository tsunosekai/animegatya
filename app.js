var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var JSON5 = require('json5');
var mongoose = require('mongoose');
// 初期追加1/3
var http = require('http');
var app = module.exports = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var routes = require('./routes/index');
var users = require('./routes/users');
var dl = require('./apps/download.js');
var tenkai = require('./apps/tenkai.js');
var updateAnime = require('./apps/updateAnime.js');
var socketcnf = require('./apps/socket.js');

var conf = JSON5.parse(fs.readFileSync('./config/conf.json'));

mongoose.connect('mongodb://localhost/'+conf.dbname);

// 初期追加2/3
app.set('port', process.env.PORT || 3421);
app.set('io', io); // 他のモジュールでrequireするため

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//dl(conf.fileUrl, conf.dataFilePath).then(
//  zipName => tenkai(zipName, conf.fileName, conf.dataFilePath)
//).then(_ => updateAnime()).then(()=>{
//  console.log('データベースアップデート完了');
//});

socketcnf(io);

//初期追加3/3
server.listen(app.get('port'), function () {
  console.log('istening on port' + app.get('port'));
});

module.exports = app;
