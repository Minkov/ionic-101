(function () {
	'use strict';
	var express = require('express');
	var bodyParser = require('body-parser');
	var cors = require('cors');
	var app = express();
	var data = [];
	var lastId = 0;

	app.use(bodyParser.urlencoded());
	app.use(bodyParser.json());
	app.use(cors());

	app.post('/api/data', function (req, res) {
		var item = req.body;
		item.id = lastId += 1;
		data.push(item);
		res.json(item);
	});

	app.get('/api/data', function (req, res) {
		res.json(data);
	});

	app.delete('/api/data/:id', function (req, res) {
		var item,
			i,
			len;
		for (i = 0; i < data.length; i += 1) {
			if (data[i].id == req.params.id) {
				data.splice(i, 1);
				res.json(true);
			}
		}
		res.status(404)
			.json({
				name: "InvalidIdError",
				message: "No item with this id"
			});
	});

	var server = app.listen(3001, function () {
		var host = server.address()
			.address;
		var port = server.address()
			.port;
		console.log('Example app listening at http://%s:%s', host, port);

	});
}());