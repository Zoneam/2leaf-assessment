$(document).ready(function () {
  let currentIndex = 0;
  $("#login-modal").show();

  function slideTo(index) {
    $(".slides").css("transform", `translateX(${-index * 50}%)`);
    currentIndex = index;
  }

  function nextSlide() {
    const totalSlides = $(".slides img").length;
    slideTo((currentIndex + 1) % totalSlides);
  }

  setInterval(nextSlide, 5000);


// click X to close modal
  $(".close").on("click", function() {
    $("#login-modal").hide();
  });

// click outside modal to close
$(window).on("click", function(event) {
  if (!$(event.target).closest('.modal-content').length && !$(event.target).is("#portal-btn")) {
    $("#login-modal").hide();
  }
});

// click login parent portal to open modal
  $("#portal-btn").on("click", function() {
    $("#login-modal").show();
  });

//Handle sign up
$('#signup-btn').on('click', function(e) {
  e.preventDefault();
  const email = $('#signup-email').val();
  const password = $('#signup-password').val();
  console.log("email: " + email + ", Password: " + password);

  $.ajax({
      url: 'http://localhost:3001/api/users',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ email: email, password: password }),
      success: function(token) {
          console.log('Signup successful:', token);
          // Handle success


          
      },
      error: function() {
          alert('Signup failed');
      }
  });
});

// Handle logun 
  $("#login-form").on("submit", function(event) {
    event.preventDefault();
    const email = $("#login-email").val();
    const password = $("#login-password").val();
    console.log("email: " + email + ", Password: " + password);

    $.ajax({
      url: 'http://localhost:3001/api/users/login',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ email: email, password: password }),
      success: function(token) {
          console.log('Login successful:', token);
          localStorage.setItem('userToken', token);
          window.location.href = 'dashboard.html';
      },
      error: function() {
          alert('Login failed');
      }
  });
    $("#login-modal").hide();
  });
});
