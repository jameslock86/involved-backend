var express = require('express');
var app = express();
var Router = express.Router();

// Require User model in our routes module
var User = require('../public/javascripts/models/users');

// Defined store route
Router.route('/user/post').post(function (req, res) {
	console.log('this is req.body',req.body);
	var user = new User(req.body);
	user.save()
		.then(User => {
			res.status(200).json({User: 'User added successfully'});
		})
		.catch(err => {
			res.status(400).send('unable to save to database',err);
		});
});

// Defined get data(index or listing) route
Router.route('/').get(function (req, res) {
	User.find(function (err, user){
		if(err){
			console.log(err);
		}
		else {
			res.json(user);
		}
	});
});

// Defined edit route
Router.route('/put/:id').get(function (req, res) {
	var id = req.params.id;
	User.findById(id, function (err, user){
		res.json(user);
	});
});

//  Defined update route
Router.route('/update/:id').post(function (req, res) {
	User.findById(req.params.id, function(err, user) {
		if (!user)
			return next(new Error('Could not load Document'));
		else {
			// do your updates here
			user.user = req.body.user;

			user.save().then(user => {
				res.json('Update complete');
			})
				.catch(err => {
					res.status(400).send('unable to update the database');
				});
		}
	});
});

// Defined delete | remove | destroy route
Router.route('/delete/:id').get(function (req, res) {
	User.findByIdAndRemove({_id: req.params.id},
	  function(err, user){
			if(err) res.json(err);
			else res.json('Successfully removed');
		});
});

module.exports = Router;
