'use strict';

angular.module('midasApp').config(function ($stateProvider) {
	$stateProvider.state('backend', {
		url: '/backend',
		templateUrl: 'backend/backend.html',
		controller: 'BackendCtrl'
	});
});
