<?php
// Server-side validation

$firstName = $lastName = $email = $phone = $course = "";
$hashedPassword = "";
$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate First Name
    if (empty($_POST["first-name"])) {
        $errors[] = "First name is required";
    } else {
        $firstName = test_input($_POST["first-name"]);
    }

    // Validate Last Name
    if (empty($_POST["last-name"])) {
        $errors[] = "Last name is required";
    } else {
        $lastName = test_input($_POST["last-name"]);
    }

    // Validate Email
    if (empty($_POST["email"])) {
        $errors[] = "Email is required";
    } else if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    } else {
        $email = test_input($_POST["email"]);
    }

    // Validate and Hash Password
    if (empty($_POST["password"])) {
        $errors[] = "Password is required";
    } else {
        $hashedPassword = password_hash($_POST["password"], PASSWORD_DEFAULT);
    }

    // Additional validations for phone and course...
    $phone = test_input($_POST["phone"]); // Optionally validate phone format
    $course = test_input($_POST["course"]);
    if (empty($course)) {
        $errors[] = "Course selection is required";
    }

    // Database connection and insertion
    if (empty($errors)) {
        $servername = "localhost";
        $username = "cyber"; // Your database username
        $password = "Cybernights2023@"; // Your database password
        $dbname = "womenintocybersecurity"; // Your database name

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, password, phone, course) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $firstName, $lastName, $email, $hashedPassword, $phone, $course);

        $stmt->execute();

        echo "New records created successfully";

        $stmt->close();
        $conn->close();
    } else {
        // Handle errors (e.g., send back to the form with error messages)
        foreach ($errors as $error) {
            echo $error . "<br>";
        }
    }
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>
