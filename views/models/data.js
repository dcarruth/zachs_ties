function payment(pool, callback){

	pool.query("SELECT payment, paymentid FROM payments", (err, response) => {
	
		if (err) {
			console.log(err);
		} else {
			var result = [];
			var id = [];
			for (var i in response.rows){
				result.push(response.rows[i].payment);
				id.push(response.rows[i].paymentid);
			}
			callback(result, id);
		}
		})
}

function createOrder(pool, params, callback){
	var q = "INSERT INTO orders (customerID, paymentMethodID, numberOfTies, orderNeededBy, color, typeOfPattern, typeOfFabric, notes, dateOrdered) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)"
	  pool.query(q, params, (err, re) => {
		  if (err){
			callback(1);
			}
		  else {
		  callback(null);
	  }});
		 
}

function createAccount(pool, params, callback){
	var q = "INSERT INTO customers (name, address, city, st, zip, phone, email, username, password) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)";
	pool.query(q, params, (err, res) => {
		if (err){
			callback(1);
		}else{
			callback(null);	
		}
	})
}

function login(pool, params, pass, callback){
	var q = "SELECT customerID, name, password FROM customers WHERE username = $1";
	 pool.query(q, params, (err, response) => {
		  var result = {name:"",id:""};
		  if (err) {
			  callback(err,null);
		  }
		  else {
			  if (response.rows != "")
			  {
				  if (response.rows[0].password == pass){
					result.name = response.rows[0].name;
					result.id = response.rows[0].customerid;
					callback(null, result);
				  }	
				  else {
					 callback(1, "Invalid credentials! Please try again."); 
				  }
			  }
			  else {
					callback(1,"Username not found! Please create an account.");
			  }
		  }
	  })	
}


module.exports = {
	p: payment,
	co: createOrder,
	createAccount: createAccount,
	login: login
};