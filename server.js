var express = require('express');
var app = express();

var users = [];
users.list = function() {
	if(!(this.length>0)) {
		return 'Список пользователей пуст';	
	} else {
		list = '<ol>';
		for(var i in this) {
			list += '<li>' + this[i].login + ', пароль: ' + this[i].password + '<br/>Машина: ' + JSON.stringify(this[i].cars);
		}
		return list + '</ol>';
	}
};

app.get('/', function(req, res){
  res.send('Главная страница.'+'Число пользователей: '+users.length + '<br/> Список пользователей:' + users.list());
});

app.get('/user/add', function(req, res){
	users.push({
		login: Math.random(),
		password: Math.random(),
		cars: []
	});
  res.send('Пользователь добавлен');
});

app.get('/user/:id/cars/add', function(req, res){
	users[req.params.id].cars.push({
		model: Math.random(),
		mark: Math.random(),
		year: Math.random(),
		engine_num_or_vin: Math.random(),
		cuzov_num: Math.random(),
		probeg: Math.random()
	});
    res.send('Машина добавлена для пользователя ' + req.params.id + ' : ' + users.list());
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});