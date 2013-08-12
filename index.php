<html>
<head>
<script src="js/jquery.js"></script>
<script src="js/jquery-ui.js"></script>
<script src="js/upload.js"></script>
<script>
$(function(){
	$('.uploadContainner').xifinUpload({
		multiple:true,
		ajax:{
			type:"POST",
			url:""
		}
	});
});
</script>
</head>
<body>
<div class="uploadContainner">
</div>
<div class="result">
<?php 
foreach ($_FILES["files"]["error"] as $key => $error) {  
    if ($error == UPLOAD_ERR_OK) {  
        $name = $_FILES["files"]["name"][$key]; 
        echo "request File:".$name;
   }  
}  
?>
</div>
</body>
</html>