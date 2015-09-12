'use strict';

angular.module('midasApp').config(function ($stateProvider) {
	$stateProvider.state('backend.dashboard', {
		url: '/dashboard',
		templateUrl: 'backend/admin/dashboard/dashboard.html',
		controller: 'DashboardCtrl'
	});
});
