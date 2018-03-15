const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var dataController = require('./views/controllers/zach_cont.js');
var pool = dataController.getdb();
var bodyParser = require('body-parser');

express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
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
  .get('/order', (req, res) => res.render('pages/order'))
  .post('/confirm', (req, res) => {
	  var color = req.body.color;
	  var numTies = req.body.numTies;
	  var fabric = req.body.fabric;
	  var dateNeeded = req.body.dateNeeded;
	  var pattern = req.body.pattern;
	  var notes = req.body.notes;
	  res.render('pages/confirm',{
		  color: color,
		  numTies: numTies,
		  fabric: fabric,
		  dateNeeded: dateNeeded,
		  pattern: pattern,
		  notes: notes
	  });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
