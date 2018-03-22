
function payment(pool, callback){

	pool.query("SELECT payment FROM payments", (err, response) => {
	
		if (err) {
			console.log(err);
		} else {
			var result = [];
			for (var i in response.rows){
				result.push(response.rows[i].payment);
			}
			callback(result);
		}
		})
}

module.exports = {
	p: payment
};