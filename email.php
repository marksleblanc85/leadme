<?php
	$name = $_POST['name'];
	$email = $_POST['email'];
	$blank = $_POST['blank'];
	if($blank == ''){
		if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$headers = "From: " . strip_tags($_POST['email']) . "\r\n";
			$headers .= "Reply-To: ". strip_tags($_POST['email']) . "\r\n";
			$headers .= "MIME-Version: 1.0\r\n";
			$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
			$message = 'Name: '.$name.'<br/>Email: '.$email.'<br/>Message: '.$_POST['message'];
			if(mail('rob@leadmemedia.com', 'Submission from LeadMeMedia.com Contact Form', $message, $headers)) {
				echo 'Thanks. Your email was sent successfully.';
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