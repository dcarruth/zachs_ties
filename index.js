const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const {Pool} = require('pg')
var pg = require('pg');

	const pool = new Pool({
	user: 'posttemp',
	host: 'localhost',
	database: 'zachs_ties',
	password: 'cs313',
	port: 5432,});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/zach_home'))
  .get('/home', (req, res) => {
	  pool.query("SELECT * FROM payments", (err, response) => {
	
		if (err) {
			console.log(err);
		} else {
			res.send(response.rows);
	  }
  });
	  pool.end();
  })
  .get('/test', (req, res) => {
	  res.send(process.env.DATABASE_URL);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
