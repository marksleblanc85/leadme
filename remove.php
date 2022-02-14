<?php
	$firstname = $_POST['firstname'];
	$lastname = $_POST['lastname'];
	$email1 = $_POST['email1'];
	$email2 = $_POST['email2'];
	$mobile = $_POST['mobile'];
	$homephone = $_POST['homephone'];
	$homeaddress = $_POST['homeaddress'];
	$businessaddress = $_POST['businessaddress'];
	$blank = $_POST['blank'];
	if($blank == ''){
		if (filter_var($email1, FILTER_VALIDATE_EMAIL)) {
			$headers = "From: " . strip_tags($_POST['email1']) . "\r\n";
			$headers .= "Reply-To: ". strip_tags($_POST['email1']) . "\r\n";
			$headers .= "MIME-Version: 1.0\r\n";
			$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
			$message = "First Name: ".$firstname."<br/>Last Name: ".$lastname."<br/>Email: ".$email1."<br/>Email 2: ".$email2."<br/>Mobile Phone: ".$mobile."<br/>Home Phone: ".$homephone."<br/>Home Address: ".$homeaddress."<br/>Business Address: ".$businessaddress;
			if(mail('rob@leadmemedia.com', 'Info Removal Request', $message, $headers)) {
				echo 'Thanks. Your request has been received. Your information will be removed within 72 hours, as per CAN-SPAM legal guidelines';
			} else {
				echo 'There was a problem sending your email.';
			}
		} else {
			echo 'Please enter a valid email address.';
		}
	} else {
		echo 'Caught by honeypot.';
	}
?>