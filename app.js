var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var keys = require('./public/javascripts/keys');
var mongoose = require('mongoose');
var db = require('./public/javascripts/models/db');
var user = require('./public/javascripts/models/users');

// var index = require('./routes/index');
// var Users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () =>{
	console.log('connected to mongo!!!');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true}));

app.get('/',(req,res) => {
	res.send('got you bro');
} );
app.get('/user',(req, res) =>{
	console.log('getting the user');
	user.find({})
		.exec((err,user)=>{
			if(err){
				res.send(err);
			} else {
				console.log(user);
				res.json(user);
			}
		});
});
app.get('user/:id',(req,res) =>{
	console.log('find one user');
	user.find({
		_id:req.params.id
	})
		.exce((err,user) =>{
			if(err){
				console.log(err);
			}else{
				console.log(user);
				res.json(user);
			}
		});
});

app.post('/user',(req,res)=>{

	let newUser = new user();
	newUser.email = req.body.email;
	newUser.password = req.body.password;
	newUser.address = req.body.address;
	newUser.city = req.body.city;
	newUser.state = req.body.state;
	newUser.zipcode = req.body.zipcode;
	newUser.save((err,book) =>{
		if(err){
			console.log(err);
		}else{
			console.log(user);
			res.send(user);
		}
	});
});





// app.use('/', index);
// app.use('/users', users);





// catch 404 and forward to error handler
// app.use(function(req, res, next) {
// 	var err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);
// });

// error handler
// app.use(function(err, req, res, next) {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get('env') ===
// 	'development' ? err : {};
//
// 	// render the error page
// 	res.status(err.status || 500);
// 	res.render('error');
//
//
// });

module.exports = app;
