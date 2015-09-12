'use strict';

angular.module('midasApp').factory('Registers', function (Restangular) {
	return Restangular.service('signup');
});
