var cassandra = require('cassandra-driver');


const PORT = 9042;
const CASSANDRA_PORT = process.env['CASSANDRA_PORT'];
const CASSANDRA_PATH = '127.0.0.1';


var client = new cassandra.Client({contactPoints: [CASSANDRA_PATH],localDataCenter:'datacenter1'});
/*
 * GET home page.
 */

exports.init_cassandra = function(req, res){
client.connect().then((da)=>{
	console.log(da)
})
};
