'use strict';

angular.module('midasApp').controller('LoginCtrl', function () {
	// do nothing
}).controller('LogoutCtrl', function($state, $http, YamaOAuth) {
	$http.get('/auth/logout').success(function() {
		YamaOAuth.logout();
	});
});
