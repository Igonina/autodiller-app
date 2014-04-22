var express = require('express');
var app = express();


var users = [];
var manufacturers = [];
var fuel = [];
var repair = [];
var providers = [];

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

  res.send('Главная страница.' + 'Число пользователей: '+users.length + '<br/> Список пользователей:' + users.list());
  
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
		manufacturer: manufacturers[0],
		model: manufacturers[0].models[0],
		year: Math.random(),
		engine_num_or_vin: Math.random(),
		cuzov_num: Math.random(),
		probeg: Math.random()
	});
    res.send('Машина добавлена для пользователя ' + req.params.id + ' : ' + users.list());
});


app.get('/manufacturer/add/:name', function(req, res) {
	manufacturers.push({
		name: req.params.name,
		models: []
	});
	res.send('Производитель добавлен: ' + req.params.name);
});

app.get('/manufacturer/:id/model/add/:name', function(req, res) {
	manufacturers[req.params.id].models.push({
		name: req.params.name
	});
	res.send('Модель ' + req.params.name+ 'для производителя'+req.params.id+ 'добавлена');
});

app.get('/fuel/add', function(req, res) {
	fuel.push({
		consumption_km: Math.random(),
		consumption_l: Math.random(),
		cost_l: Math.random(),
		date_of_filling: Math.random()
	});
	res.send('Расход топлива добавлен');
});

app.get('/repair/add', function(req, res) {
	repair.push({
		mileage: Math.random(),
		sum: Math.random(),
		repair_view: [] 
	});
	res.send('Ремонт добавлен');
});
		
app.get('/repair/:id/repair_view/add/:view', function(req, res) {
	repair[req.params.id].repair_view.push({
		view: req.params.view		
	});
	res.send('Вид ремонта' + req.params.view+ '  для ремонта '+req.params.id+ '  добавлено  ');
});

app.get('/provider/add', function(req, res) {
	providers.push({
		name_shop: Math.random(),
		address: Math.random(),
		average_check: Math.random(), 
		store: []
	});
	res.send('Поставщик добавлен');
});

app.get('/provider/:id/store/add', function(req, res) {
	providers[req.params.id].store.push({
		manufacturer: Math.random(),
		model: Math.random(),
		engine_num_or_vin: Math.random(),
		details: [],
		detail_num: Math.random(),
		detail_cost: Math.random()				
	});
	res.send('Склад для поставщика' + req.params.id+  '  добавлен');
});

app.get('/store/:id/detail/add', function(req, res) {
	store[req.params.id].detail.push({
		name: Math.random()				
	});
	res.send('Деталь для склада' + req.params.id+  '  добавлена');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});