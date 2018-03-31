const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var dataController = require('./views/controllers/zach_cont.js');
var bodyParser = require('body-parser');
var date = require('date-utils');
var session = require('client-sessions');
const duration = 30 * 60 *1000;
const active = 5 * 60 * 1000;

express()
  .use(session({cookieName: 'session', secret: 'user-session', duration: duration, activeDuration: active,}))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', dataController.home)
  .get('/order', dataController.getPayments)
  .post('/confirm', dataController.createOrder)
  .get('/create', dataController.create)
  .post('/create', dataController.createAccount)
  .get('/login', dataController.login)
  .post('/login', dataController.loginValidate)
  .get('/logout', dataController.logout)
  .get('/gallery', dataController.gallery)
  .get('/edit', dataController.edit)
  .post('/edit', dataController.update)
  .get('/admin',dataController.admin)
  .post('/admin',dataController.adminValidate)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  
  
  
  
  
  
  
  
  
  