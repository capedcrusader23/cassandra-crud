var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var customers = require('./routes/customers');
var cassandrainfo = require('./routes/cassandrainfo');
var app = express();
var cassandra = require('cassandra-driver');
const PORT = 9042;
const CASSANDRA_PORT = process.env['CASSANDRA_PORT'];
const CASSANDRA_PATH = '127.0.0.1';
var client = new cassandra.Client({contactPoints: [CASSANDRA_PATH],localDataCenter:'datacenter1'});
client.connect(function(err,res){
  console.log("Connected")
})
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',(req,res)=>{
  res.render("index");
})
app.get('/customers', customers.list);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id',customers.save_edit);
app.use(app.router);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
