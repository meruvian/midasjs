'use strict';

angular.module('midasApp').config(function ($stateProvider) {
	$stateProvider.state('backend.profile', {
		url: '/account/profile',
		templateUrl: 'backend/account/profile/profile.html',
		controller: 'ProfileCtrl'
	});
});
