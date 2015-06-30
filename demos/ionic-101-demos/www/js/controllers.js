/* globals angular, document */
(function () {
	'use strict';

	function clear(ctx, pos, size) {
		ctx.clearRect(pos.x - 1, pos.y - 1, size.w + 2, size.h + 2);
	}

	function draw(ctx, pos, size) {
		ctx.fillRect(pos.x, pos.y, size.w, size.h);
	}

	angular.module('starter.controllers', [])

	.controller('GesturesCtrl', function ($scope) {
			var isBig = false,
				pos = {
					x: 0,
					y: 0
				},
				size = {
					w: 30,
					h: 30
				},
				canvas = document.getElementById('canvas'),
				ctx = canvas.getContext('2d');
			draw(ctx, pos, size);

			$scope.onHold = function () {
				clear(ctx, pos, size);
				if (isBig) {
					size.w /= 2;
					size.h /= 2;
				} else {
					size.w *= 2;
					size.h *= 2;
				}
				isBig = !isBig;
				draw(ctx, pos, size);
			};

			$scope.onDrag = function (ev) {
				clear(ctx, pos, size);
				pos.x = ev.gesture.center.pageX;
				pos.y = ev.gesture.center.pageY;
				draw(ctx, pos, size);
			};
		})
		.controller('DataCtrl', function ($scope, $http) {
			$scope.data = [];
			$scope.item = {
				text: ''
			};
			$scope.addItem = function () {
				$http.post('http://localhost:3001/api/data', $scope.item)
					.success(function (data) {
						$scope.data.push(data);
					});
			};

			$scope.deleteItem = function (id) {
				$http.delete('http://localhost:3001/api/data/' + id)
					.success(function () {
						for (var i = 0; i < $scope.data.length; i += 1) {
							if ($scope.data[i].id === id) {
								$scope.data.splice(i, 1);
								break;
							}
						}
					});
			};

			$http.get('http://localhost:3001/api/data')
				.success(function (data) {
					$scope.data = data;
					// console.log(data);
				});
		});
}());