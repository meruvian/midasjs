'use strict';

angular.module('midasApp').controller('BackendCtrl', function ($state) {
	if ('backend' === $state.current.name) {
		$state.transitionTo('backend.summary');
	}
});
