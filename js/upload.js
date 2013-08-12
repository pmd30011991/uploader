(function($) {

	// Init Browser
	$.browser = {};
	$.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase())
			&& !/webkit/.test(navigator.userAgent.toLowerCase());
	$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
	$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
	$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

	// private Function.
	var getName = function(name) {
		return prefix + '_' + name;
	};
	var prefix = "xifinUpload";
	// INIT constants.
	var NAME_UPLOADER = getName("uploader");

	$.widget("ui.xifinUpload", {
		options : {
			multiple : false,
			ajax : {
				type : "POST",
				url : ""
			}
		},
		// Constructor.
		_init : function() {
			this.containner = this.element;
			this.uploader = null;
			this.xhr = null;
			var that = this, ops = this.options, multi = "";

			if (window.XMLHttpRequest) {
				// code for IE7+, Firefox, Chrome, Opera, Safari
				this.xhr = new XMLHttpRequest();
			} else {// code for IE6, IE5
				this.xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			if (ops.multiple)
				multi = "multiple";
			if ($.browser.msie) {
				this.uploader = $("<input type='file[]' id='" + NAME_UPLOADER + "' />");

			} else {
				this.uploader = $("<input type='file' id='" + NAME_UPLOADER + "' " + multi + " />");
			}
			this.uploader.bind("change", function() {
			});
			
			
			this.uploader = this.uploader.get(0);
			this.containner.html(this.uploader);
		},
		_getFileList : function() {
			var files = null;
			if ($.browser.msie) {

			} else {
				files = this.uploader.files;
			}
			return files;
		},
		/// Pulbic method
		upload : function() {
			xhr = new XMLHttpRequest();
			var files = this._getFileList();
			if (xhr.upload){
				// start upload
				var formdata = new FormData();
				for (var i=0;i < files.length; i++) {
					formdata.append("files[]", files[i]);
				}
				xhr.open(this.options.ajax.type,this.options.ajax.url, true);
				xhr.send(formdata);
				xhr.onreadystatechange = function(){
					if(xhr.readyState === 4 && xhr.status === 200){
		                $._trigger("onComplete",null,{});      
		            }
				}
			}
		},
	});
	$.extend($.ui.xifinUpload, {
		version : "1.1.0",
	});
})(jQuery);