var db = require('./../models/zach.js');

function getdb (){
	return db.getdb();
}

module.exports = {
	getdb: getdb
};