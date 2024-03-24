<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $budget = htmlspecialchars($_POST['budget']);

    $secretKey = "YOUR_SECRET_KEY";
    $captcha = $_POST['g-recaptcha-response'];

    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$captcha");
    $responseKeys = json_decode($response, true);

    if (intval($responseKeys["success"]) !== 1) {
        echo 'reCAPTCHA verification failed.';
    } else {
        $to = 'so.hayase0411@gmail.com';
        $message = "Name: $name\nEmail: $email\nSubject: $subject\nBudget: $budget";
        $headers = "From: $email";

        if (mail($to, $subject, $message, $headers)) {
            echo 'メールが送信されました。';
        } else {
            echo 'メールの送信に失敗しました。';
        }
    }
}
?>
