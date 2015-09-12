'use strict';

angular.module('midasApp').factory('Dashboards', function (Restangular) {
	return {
		metrics: Restangular.service('actuator/metrics')
	};
});
