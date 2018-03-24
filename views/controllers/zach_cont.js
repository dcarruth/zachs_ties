var data = require('./../models/data.js');
var path = require('path'),
    fs = require('fs');
	
function getdb (){
	const {Pool} = require('pg');
	var pool = null;
	if (process.env.DATABASE_URL){
		var url = "postgres://jnpwkepxmegxxf:a047319b418d500e2e0ab6ead829af6d645c678fb3b9c168b31970c164e35b3a@ec2-54-204-45-43.compute-1.amazonaws.com:5432/d3vtsi1iri5hka";
		pool = new Pool ({
			connectionString: url
		});
	}
	else {
		pool = new Pool({
		user: 'posttemp',
		host: 'localhost',
		database: 'zachs_ties',
		password: 'cs313',
		port: 5432,});
	}
	return pool;
}

function home(req, res){
	res.render('pages/zach_home',{name: req.session.name});
}

function logout(req, res){
	req.session.destroy();
	res.render('pages/zach_home');
}

function getPayments(req, res){
	var pool = getdb();
	data.p(pool, function (result, id){
		res.render('pages/order',{result:result, id:id, name: req.session.name});
		pool.end();
	});	
}

function login(req, res){
	if (typeof req.session.name == "undefined"){
	  res.render('pages/login');
	  }else{
		  res.render('pages/zach_home',{name: req.session.name});
	  }
}

function create(req, res){
	res.render('pages/create',{name: req.session.name});
}

function gallery(req, res){
	res.render('pages/gallery',{name: req.session.name});
}

function createOrder(req, res){
	var pool = getdb();
	var color = req.body.color;
	var numTies = req.body.numTies;
	var fabric = req.body.fabric;
	var dateNeeded = req.body.dateNeeded;
	var pattern = req.body.pattern;
	var notes = req.body.notes;
	var method = req.body.method;
	var params = [req.session.id, method, numTies, dateNeeded, color, pattern, fabric, notes, Date.today()];
	if (typeof req.session.name == "undefined"){
			res.render('pages/confirm',{
			message: "Oops! Please login before ordering."
	})
	pool.end();
	return;
	}
	
	data.co(pool, params, function (err){
		
		if (err){
			res.render('pages/confirm',{
			message: "Oops! There was an error in processing your order. Please try again. If the error continues please try again later."
		})}
		  
		  else {
			res.render('pages/confirm',{
			message: "Thank you for ordering from On Point Ties! You order will be processed and you will receive and email within 48 hours."
		  })};
	
	});
  
	pool.end();
}

function createAccount(req, res) {
	var pool = getdb();
	var name = req.body.name;
	var address = req.body.address;
	var city = req.body.city;
	var state = req.body.state;
	var zip = req.body.zip;
	var email = req.body.email;
	var phone = req.body.phone;
	var username = req.body.username;
	var password = req.body.password;
	var params = [name, address, city, state, zip, phone, email, username, password];
	data.createAccount(pool, params, function (err){
		if (err || typeof name == "undefined"){
			res.render('pages/confirm',{
			message: "Oops! There was an error in creating your account. Please try again."
		})}else {
			res.render('pages/zach_home', {name:name});
		}
	});
	pool.end();
}

function loginValidate(req, res){
	var pool = getdb();
	var username = req.body.username;
	var pass = req.body.password;
	var params = [username];
	data.login(pool, params, pass, function(err, result){
		if (err == 1){
			res.render('pages/confirm',{message: result});
		}
		else if(err)
		{
			res.render('pages/confirm',{message: "Oops! Something went wrong. Please try again!"});
		}
		else {
			req.session.name = result.name;
			req.session.id = result.id;
			res.render('pages/zach_home',{name: result.name});
		}
	})
}

function edit(req, res){
	if (typeof req.session.name == "undefined"){
		res.render('pages/login', {name: "Please login to edit your account! Don't have an account? Please select \"Sign Up\" to create one now!"});
	}
	else {
		var pool = getdb();
		data.edit(pool, req.session.id, function(result){
			res.render('pages/edit', {name: req.session.name, result: result});
		})
	
	}
	pool.end();
}

function update(req, res){
	var pool = getdb();
	var name = req.body.name;
	var address = req.body.address;
	var city = req.body.city;
	var state = req.body.state;
	var zip = req.body.zip;
	var email = req.body.email;
	var phone = req.body.phone;
	var username = req.body.username;
	var password = req.body.password;
	var params = [name, address, city, state, zip, phone, email, username, password, req.session.id];
	data.updateAccount(pool, params, function (err){
		if (err){
			res.render('pages/confirm',{
			message: "Oops! There was an error in updating your account. Please try again."
		})}else {
			res.render('pages/confirm', {name:name, message: "Your account has been updated!"});
		}
	});
	pool.end();
}

module.exports = {
	getdb: getdb,
	home: home,
	logout: logout,
	getPayments: getPayments,
	login: login,
	create: create,
	gallery: gallery,
	createOrder: createOrder,
	createAccount: createAccount,
	loginValidate:loginValidate,
	edit: edit,
	update: update
};
