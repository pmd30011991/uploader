<?php 
var_dump($_REQUEST);
echo "----------------------";
var_dump($_FILES);
?>
<html>
<head>
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery-ui.js"></script>
<script type="text/javascript" src="js/upload.js"></script>
<script type="text/javascript">
$(function(){
	$('.uploadContainner').xifinUpload({
		multiple:true,
		ajax:{
			url:"",
			data:{'val1':1,'val2':2}
		},
		onComplete : function(data){
		console.log(data['data']);
			//$('.result').html(params.data);
		}
	});
});
</script>
</head>
<body>
<div class="uploadContainner">
</div>
<div class="result">

</div>

</body>
</html>