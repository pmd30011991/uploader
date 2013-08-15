/**
 *  Name: Ajax Multiple Files Uploader Jquery Plugin
 *  Description: jQuery Plugin Widget create a Uploader For file uploading, it's can run on IE7+, Chrome, Firefox
 *  Author: Duy Anh
 *  Date: 8/14/2013
 *  Version: 1.0.0(Dev)
 */

(function($) {
	var prefix = "xifinUpload";
	var getName = function(name) {
		return prefix + '_' + name;
	};
	
	var NAME_UPLOADER = getName("uploader"),
	CLASS_UPLOADER = getName("uploaderclass"),
	NAME_IFRAME = getName("iframe"),
	NAME_UPLOAD_FORM = getName("uploadForm"),
	//CSS_IFRAME = "width:0;height:0;visibility:hidden",
	CSS_IFRAME = "",
	POST_METHOD = "POST";
	$.widget("ui.xifinUpload", {
		options : {
			multiple : false,
			ajax : {
				url : "",
				data:{}
			}
		},
		_init : function() {
			this.containner = this.element;
			this.uploader = null;
			this.form = null;
			this.xhr = null;
			var that = this, ops = this.options, multi = "";
			if (ops.multiple) {
				multi = "multiple";
			}
			this.uploader_element = "<input name='files[]' type='file' class='"+CLASS_UPLOADER+"' id='" + NAME_UPLOADER + "' " + multi + " />";			
			this.uploader = $(this.uploader_element);
			if ($.browser.msie) {
				this.form = $('<form name="'+NAME_UPLOAD_FORM+'" id="'+NAME_UPLOAD_FORM+'" action="'+ops.ajax.url+'" method="'+POST_METHOD+'" enctype="multipart/form-data">' +
						'<iframe style="'+CSS_IFRAME+'" id="'+NAME_IFRAME+'" name="'+NAME_IFRAME+'" src=""></iframe>'+
				'</form>');
				this.form.append(this.uploader);
				this.containner.html(this.form);
			} else {
				this.containner.html(this.uploader);
			}
			this.uploader.bind("change",function(){
				that._bindUploaderChangeEvent();
			});
			this.uploader = this.uploader.get(0);
		},
		_getXhr : function(){
			if (window.XMLHttpRequest) {this.xhr = new XMLHttpRequest();} 
			else {this.xhr = new ActiveXObject("Microsoft.XMLHTTP");}
			return this.xhr;
		},
		_bindUploaderChangeEvent : function(){
			if($.browser.msie && this.form != null){
				var uploaders = $(this._getClass(CLASS_UPLOADER));
				var isAdd = true;
				for(var i =0; i< uploaders.length;i++)
				{
					var up = uploaders[i].value;
					if(up == "" || up == undefined)
						isAdd = false;
				}
				if(isAdd){
					this._addUploader();
				}
			}
		},
		_getClass : function(className){return "."+className;},
		_getId : function(idName){return '#'+idName;},
		_getFileList : function() {
			var files = null;
			if ($.browser.msie) {

			} else {
				files = this.uploader.files;
			}
			return files;
		},
		_parseArrayToParams : function(array){
			var out = new Array();
			for (key in array) {
				out.push(key + '=' + array[key]);
			}

			return out.join('&');
		},
		_putArrayParamsToFormData : function(formdata,array){
			for (key in array) {
				formdata.append(key,array[key]);
			}
			return formdata;
		},
		_addUploader : function(){
			var that = this;
			var form = $(this._getId(NAME_UPLOAD_FORM));
			if($.browser.msie && form.length > 0){
				var new_el = $(this.uploader_element);
				form.append(new_el);
				new_el.bind("change",function(){
					that._bindUploaderChangeEvent();
				});
			}
		},
		/// Pulbic method
		setData : function(data){this.options.ajax.data = data;},
		upload : function() {
			var that = this;
			if($.browser.msie){
				document.getElementById(NAME_UPLOAD_FORM).target = NAME_IFRAME;
				document.getElementById(NAME_UPLOAD_FORM).submit();
				$(this._getId(NAME_IFRAME)).load(function(){
					var contents =$(that._getId(NAME_IFRAME))[0].contentWindow.document.getElementsByTagName('body')[0].innerText
					console.log(contents);
					that._trigger("onComplete",null,{'data':contents});
				});

			} else {
				var files = this._getFileList();
				var xhr = this._getXhr();
				if (xhr.upload){
					// start upload
					var formdata = new FormData();

					for (var i=0;i < files.length; i++) {
						formdata.append("files[]", files[i]);
					}
					xhr.open(POST_METHOD,this.options.ajax.url, true);
					formdata = this._putArrayParamsToFormData(formdata, this.options.ajax.data);
					console.log(formdata);
					xhr.send(formdata);
					xhr.onreadystatechange = function(){
						if(xhr.readyState === 4 &&xhr.status === 200){
							that._trigger("onComplete",null,{'data':xhr.responseText});
						}
					};
				}

			}
		}
	});
	$.extend($.ui.xifinUpload, {
		version : "1.0.0"
	});
})(jQuery);