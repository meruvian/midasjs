#angular-popup-boxes
run `bower install` before you open the sample file

Requirements: Angular (duh?!), UI-Bootstrap, Bootstrap (CSS only) and jQuery

```
angular.module("sampleApp", ['angularPopupBoxes'])
.config(['angularPopupBoxesProvider', function(angularPopupBoxesProvider)
{
	angularPopupBoxesProvider.setTexts('Yep :D', 'Nop =/');
}])
.controller('sampleCtrl', ['$scope', 'angularPopupBoxes', function($scope, popup)
{
	// You can change the texts at any time!
	// popup.setTexts('Yep :D', 'Nop =/');

	$scope.alertSample = function()
	{
		popup.alert('Well... Not many options here...').result.then(function()
		{
			alert('You rock, mate!')
		});
	};

	$scope.inputSample = function()
	{
		popup.input("Type something... Pleeeeease").result.then(function(input)
		{
			alert('Wow man, you just typed "' + input + '"');
		}, function()
		{
			alert('Or don\'t :D');
		});
	};

	$scope.confirmSample = function()
	{
		popup.confirm("Choose wisely").result.then(function(input)
		{
			alert('Yep!');
		}, function()
		{
			alert('Nop!');
		});
	};
}]);
```

Aaaaaand that's all folks!