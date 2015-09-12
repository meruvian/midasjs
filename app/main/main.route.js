'use strict';

angular.module('midasApp').config(function ($stateProvider) {
	$stateProvider.state('main', {
		url: '/',
		controller: 'MainCtrl'
	});
});
