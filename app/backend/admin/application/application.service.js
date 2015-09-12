'use strict';

angular.module('midasApp').factory('Applications', function (Restangular) {
	return Restangular.service('applications');
});
