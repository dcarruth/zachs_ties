const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var dataController = require('./views/controllers/zach_cont.js');
var bodyParser = require('body-parser');
var date = require('date-utils');
var session = require('client-sessions');

express()
  .use(session({
	  cookieName: 'session',
	  secret: 'user-session',
	  duration: 30 * 60 * 1000,
	  activeDuration: 5 * 60 * 1000,
  }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/zach_home'))
  .get('/order', (req, res) => {
	   var pool = dataController.getdb();
	   pool.query("SELECT payment FROM payments", (err, response) => {
	
		if (err) {
			console.log(err);
		} else {
			var result = [];
			for (var i in response.rows){
				result.push(response.rows[i].payment);
			}
			res.render('pages/order',{result:result});
			pool.end();
	   }
  })})
  .post('/confirm', (req, res) => {
	  var pool = dataController.getdb();
	  var color = req.body.color;
	  var numTies = req.body.numTies;
	  var fabric = req.body.fabric;
	  var dateNeeded = req.body.dateNeeded;
	  var pattern = req.body.pattern;
	  var notes = req.body.notes;
	  var method = req.body.method;
	  var a = 1;
	  var q = "INSERT INTO orders (customerID, paymentMethodID, numberOfTies, orderNeededBy, color, typeOfPattern, typeOfFabric, notes, dateOrdered) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)"
	  var params = [a, a, numTies, dateNeeded, color, pattern, fabric, notes, Date.today()];
	  pool.query(q, params, (err, re) => {
		  if (err){
			  console.log(err);
			  res.render('pages/zach_home');
		  }
		  else {
			  res.render('pages/confirm',{
		  color: color,
		  numTies: numTies,
		  fabric: fabric,
		  dateNeeded: dateNeeded,
		  pattern: pattern,
		  notes: notes,
		  method: method
			});
		 }
	  });
	  
	  pool.end();
  })
  .get('/create', (req,res) => res.render('pages/create'))
  .post('/create', (req, resp) => {
		var pool = dataController.getdb();
		var name = req.body.name;
		var address = req.body.address;
		var city = req.body.city;
		var state = req.body.state;
		var zip = req.body.zip;
		var email = req.body.email;
		var phone = req.body.phone;
		var username = req.body.username;
		var password = req.body.password;
		var q = "INSERT INTO customers (name, address, city, st, zip, phone, email, username, password) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)";
		var params = [name, address, city, state, zip, phone, email, username, password];
		pool.query(q, params, (err, res) => {
			if (err){
				console.log(err);
				resp.render('pages/create');
			}else{
				resp.render('pages/zach_home')	
			}
		})
		pool.end();
  })
  .get('/login', (req, res) => res.render('pages/login'))
  .post('/login', (req, res) =>{
	  var pool = dataController.getdb();
	  var username = req.body.username;
	  var pass = req.body.password;
	  var q = "SELECT customerID, name, password FROM customers WHERE username = $1";
	  var params = [username];
	  pool.query(q, params, (err, response) => {
		  if (err) {
			  res.render('pages/login');
		  }
		  else {
			  if (response.rows != "")
			  {
				  if (response.rows[0].password == pass){
					req.session.id = response.rows[0].customerid;
					req.session.name = response.rows[0].name;
					res.render('pages/zach_home', {name: req.session.name});
				  }	
				  else {
					 res.render('pages/login'); 
				  }
			  }
			  else {
				  res.render('pages/login');
			  }
		  }
	  })	  
	  pool.end();
  })
  .get('/logout', (req, res) => {
	  req.session.destroy();
	  res.render('pages/zach_home');
  })
  .get('/gallery', (req, res) => res.render('pages/gallery'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  
  
  
  
  
  
  
  
  
  