var db = require('./../../public/zach.js');

function getdb (){
	return db.getdb();
}

function placeOrder(numTies, color, pattern, fabric, date, notes){
	var pool = getdb();
	var query = "";
	var params = [];
	pool.query();
	pool.end();
}

function getPayments() {
	var pool = getdb();
	var query2 = "SELECT * FROM payments";
	pool.query(query2, (err, res) => {
		console.log(res.rows);
	});
	pool.end();
}


module.exports = {
	getdb: getdb,
	placeOrder: placeOrder,
	getPayments: getPayments
};



//writing to the database. Pass the values from index.js and then write the query to save
//and check the db. When it works move on!