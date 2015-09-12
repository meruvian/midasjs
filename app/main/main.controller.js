'use strict';

angular.module('midasApp').controller('MainCtrl', function ($state) {
	$state.go('backend.dashboard');
});
