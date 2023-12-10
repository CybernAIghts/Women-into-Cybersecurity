<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Shop With Us</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <header>
    <div id="logo">
        <img src="Images/Logo.png">
      </div>
    </header>

    <nav>
        <ul>
          <li><a href="index.html">Home</a></li>
          
          <li>
            <a href="#">About Us ▾</a>
            <ul>
              <li><a href="Overview.html">Overview</a></li>
              <li><a href="MeetTheFamily.html">Meet the Family</a></li>
            </ul>
          </li>
      
          <li>  
            <a href="#">Get Involved ▾</a>
            <ul>
              <li><a href="UpcomingEvents.html">Upcoming Events</a></li>
              <li><a href="ProfessionalDevelopment.html">Professional Development</a></li>
              <li><a href="Sponsorship&Collaboration.html">Sponsorship & Collaboration</a></li>
              <li><a href="EventCalender.html">Event Calendar</a></li>
            </ul>
          </li>
      
          <li>
            <a href="#">Blog ▾</a>
            <ul>
              <li><a href="FeaturedArticles.html">Featured Articles</a></li>
              <li><a href="MembershipSpotlight.html">Membership Spotlight</a></li>
            </ul>
          </li>
          
          <li><a href="ShopWithUs.html">Shop With Us</a></li>
          
          <li>
            <a href="#">Contact Us ▾</a>
            <ul>
              <li><a href="GetInTouch.html">Get in Touch</a></li>  
              <li><a href="FAQs.html">FAQs</a></li>
            </ul>
          </li>
      
          <li><a href="JoinUs.html">Join Us</a></li>
    
          <li>
            <a href="#">Account ▾</a>
            <ul>
              <li><a href="SignIn.html">Sign In</a></li>
            </ul>
          </li>
          <a href="Cart.html">
            <i class="fas fa-shopping-cart"></i> Cart (<span id="cart-count">0</span>)  
          </a>
        </ul>
    </nav>

    <section class="products">
        <?php
        include 'db.php'; // Include your database connection script

        // Fetch products from the database
        try {
            $stmt = $pdo->query('SELECT * FROM products');
            while ($row = $stmt->fetch()) {
                echo "<div class='product' data-id='{$row['id']}'>";
                echo "<img src='Images/{$row['image']}' alt='{$row['name']}'>";
                echo "<div class='details'>";
                echo "<h3>{$row['name']}</h3>";
                echo "<p>£{$row['price']}</p>";
                echo "<button class='btn-add' data-id='{$row['id']}'>Add to Cart</button>";
                echo "</div>";
                echo "</div>";
            }
        } catch (\PDOException $e) {
            echo "Database error: " . $e->getMessage(); // Handle the error
        }
        ?>
    </section>

    <footer>

        <p>&copy; 2023 Women in Cybersecurity. All rights reserved.</p>
      
        <div class="policies">
          <a href="#">Privacy Policy</a> | 
          <a href="#">Terms & Conditions</a>
        </div>
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"> 
          </head>
        <a href="https://www.facebook.com/profile.php?id=61554140456547">
            <i class="fab fa-facebook"></i>  
        </a>
        <a href="https://www.instagram.com/women_into_cybersecurity/" target="_blank">
            <i class="fab fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/in/women-into-cybersecurity-a139542a1/" target="_blank">
            <i class="fab fa-linkedin-in"></i> 
          </a>
          <a href="https://www.pinterest.co.uk/womenintocybersecurity/" target="_blank">
            <i class="fab fa-pinterest"></i> 
          </a>
      </footer>

    <script src="cart.js"></script>
</body>
</html>
