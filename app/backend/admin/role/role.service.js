'use strict';

angular.module('midasApp').factory('Roles', function (Restangular) {
	return Restangular.service('roles');
});
