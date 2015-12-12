angular.module("angularPopupBoxes", ["ui.bootstrap"])
.provider("angularPopupBoxes", function()
{
	var that = this;

	this.okText = 'Ok';
	this.cancelText = 'Cancel';

	var setTexts = this.setTexts = function (okText, cancelText)
	{
		that.okText = okText;
		that.cancelText = cancelText;
	}

	var extendOptions = function(options, defaults)
	{
		options = options || {};

		if(typeof options.okText === 'undefined')
			options.okText = defaults.okText;

		if(typeof options.cancelText === 'undefined')
			options.cancelText = defaults.cancelText;

		if(typeof options.width === 'undefined')
			options.width = 370;

		return options;
	}

	this.$get = ["$modal", "$q", function($modal, $q)
	{
		function buildModal(content, options)
		{
			var modalId = 'modal-' + Math.floor(Math.random() * 9999);
			var modalEl;

			var html  = '<div class="modal-body" id="' + modalId +  '">';
					html += content;
					html += '</div>';
					html += '<div class="modal-footer">';
					if(typeof options.cancelText === 'string')
						html += '<button class="btn btn-sm btn-danger angular-notification-btn-cancel">' + options.cancelText + '</button>';
					if(typeof options.okText === 'string')
						html += '<button class="btn btn-sm btn-primary angular-notification-btn-ok">' + options.okText + '</button>';
					html += '</div>';

			var modal = $modal.open(
			{
				template: html,
				keyboard: false,
				backdrop: 'static'
			});

			setTimeout(function()
			{
				modalEl = $("#" + modalId).parent().parent();
				modalEl.width(options.width);
				modalEl.find(".angular-notification-btn-ok").click(function()
				{
					modal.close();
				});
				modalEl.find(".angular-notification-btn-cancel").click(function()
				{
					modal.dismiss();
				});

				modal.el = modalEl;
			}, 1);

			return modal;
		}

		function confirm(content, options)
		{
			options = extendOptions(options,
			{
				okText: that.okText,
				cancelText: that.cancelText
			});

			return buildModal(content, options);
		}

		function alert(content, options)
		{
			options = extendOptions(options,
			{
				okText: that.okText,
				cancelText: false
			});

			return buildModal(content, options);
		}

		function input(content, options)
		{
			content += '<br/><br/><form class="form"><input name="input" class="form-control angular-notification-input" /></form>';
			
			options = extendOptions(options,
			{
				okText: that.okText,
				cancelText: that.cancelText
			});

			var modal = buildModal(content, options);
			var deferred = $q.defer();
			var input;

			setTimeout(function()
			{
				input = modal.el.find(".angular-notification-input");
				
				$(window).one('keydown', function()
				{
					input.focus();
				});

				input.on('keyup', function(e)
				{
					if(e.keyCode == 13)
					{
						modal.close();
					}
				});
			}, 3);

			modal.result.then(function()
			{
				var val = modal.el.find(".angular-notification-input").val();
				input.off();

				if(val === "")
				{
					deferred.reject();
				}
				else
				{
					deferred.resolve(val);
				}
			}, deferred.reject);

			modal.result = deferred.promise;

			return modal;
		}

		return {
			setTexts: setTexts,
			confirm: confirm,
			alert: alert,
			input: input
		};
	}];
});
