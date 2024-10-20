<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './vendor/autoload.php';  // Подключение автозагрузчика Composer

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8');

    $mail = new PHPMailer(true);

    try {
        // Настройки сервера
        $mail->isSMTP();
        $mail->Host = 'smtp.yandex.ru';  // SMTP сервер Yandex
        $mail->SMTPAuth = true;
        $mail->Username = 'arzumanyan.aik@yandex.ru';  // Замените на ваш email на Yandex
        $mail->Password = '';  // Замените на ваш пароль
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Установите кодировку
        $mail->CharSet = 'UTF-8';

        // Настройка адресов
        $mail->setFrom('arzumanyan.aik@yandex.ru', $name);  // Замените на ваш email на Yandex
        $mail->addAddress('arzumanyan.aik@yandex.ru');  // Замените на адрес получателя

        // Содержание письма
        $mail->isHTML(true);
        $mail->Subject = 'Новое сообщение с контактной формы';
        $mail->Body    = "<h2>Новое сообщение</h2>
                          <p><strong>Имя:</strong> $name</p>
                          <p><strong>Телефон:</strong> $phone</p>";
        $mail->AltBody = "Имя: $name\nТелефон: $phone";

        $mail->send();
        echo 'success';
    } catch (Exception $e) {
        echo "Ошибка при отправке сообщения: {$mail->ErrorInfo}";
    }
} else {
    echo 'Некорректный метод отправки.';
}
