var express = require('express')
	, midware = require('./lib/midware');

var app = exports.app = express();

app.configure(function(){
  
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.all('*', midware.header);
app.options('/api/*', function(req,res){
	res.send(200);
});
//API
require('./api/user')(app);

app.listen(3000, '0.0.0.0');
console.log("Express server listening...");
