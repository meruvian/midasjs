'use strict';

angular.module('midasApp').factory('Users', function (Restangular) {
	return Restangular.service('users');
});
