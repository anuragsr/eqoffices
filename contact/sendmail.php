<?php
    include('MAIL/PHPMailerAutoload.php');

    $postData = json_decode(file_get_contents('php://input'), true);
    
    //print_r($postData);
    
    $body = '<h3>You have a new quote request from '.$postData['firstname'].' </h3>';
    $body.= '<b>Name:</b> '.$postData['firstname'].' '.$postData['lastname'].'<br/>';
    $body.= '<b>E-Mail:</b> '.urldecode($postData['email']).'<br/>';
    $body.= '<b>Phone:</b> '.$postData['phone'].'<br/>';
    if($postData['company']!=""){
        $body.= '<b>Company:</b> '.$postData['company'].'<br/>';
    }
    if($postData['message']!=""){
        $body.= '<b>Message:</b> '.urldecode($postData['message']).'<br/>';
    }
    $body.= '<b>Schedule New Tour</b>: ';
    if(array_key_exists('wantToSchedule', $postData)){
        $body.= 'Yes<br/>';
    }else{
        $body.= 'No<br/>';
    }
    
    $mail = new PHPMailer;
    $mail->IsSMTP();                                      // Set mailer to use SMTP
    //$mail->Host = 'sg2plcpnl0102.prod.sin2.secureserver.net';  // Specify main and backup SMTP servers
    $mail->Host = 'mail.eqoffices.com';  // Specify main and backup SMTP servers
    $mail->Port = 465;                                    // TCP port to connect to
    $mail->SMTPDebug = 0;
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->SMTPSecure = "ssl";
    $mail->Username = 'webmaster@eqoffices.com';                 // SMTP username
    $mail->Password = 'November1';                           // SMTP password
    $mail->IsHTML(true);
    
    $mail->setFrom('webmaster@eqoffices.com', 'EQ Offices Admin');
    $mail->addAddress('info@eqoffices.com', 'EQ Offices Team');     // Add a recipient
    //$mail->addBcc(urldecode($postData["email"]), $postData['firstname'].' '.$postData['lastname']);     // Add a recipient
    $mail->Subject = 'You have a new Quote Request';
    $mail->Body = $body;
        
    $message = array();
    $message['body'] = $body;

    if (!$mail->send()) {
        $message['success'] = false;
        $message['message'] = 'An error occured: '.$mail->ErrorInfo.' Please try again.';
    } else {
        $message['success'] = true;
        $message['message'] = 'Thank you. We have received your details, and will revert in less than 24hrs.';
    }
    
    echo json_encode($message);
?>