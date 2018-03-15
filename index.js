const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const {Pool} = require('pg')
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
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
