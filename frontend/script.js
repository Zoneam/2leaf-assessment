$(document).ready(function () {

  // Checking for token to display modal
  function checkUserToken(successCallback) {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
          $.ajax({
              url: `${BASE_URL}api/users/check-token`,
              type: 'POST',
              headers: { 'Authorization': 'Bearer ' + userToken },
              success: function(res) {
                  successCallback();
              },
              error: function() {
                  localStorage.removeItem('userToken');
                  $("#login-modal").show();
              }
          });
      } else {
          $("#login-modal").show();
      }
  }

  // Initial check on page load
  checkUserToken(function() {
      $("#login-modal").hide();
  });

// Slider
    const slideContainer = $(".slides");
    const slides = slideContainer.children("img");
    
    function slideToNext() {
        const slideWidth = slides.width();
        slideContainer.animate({
            left: `-=${slideWidth}`
        }, 300, function() {
            slideContainer.append(slideContainer.children("img:first"));
            slideContainer.css('left', '');
        });
    }
    setInterval(slideToNext, 5000);

  // Click outside modal to close
  $(window).on("click", function(event) {
      if (!$(event.target).closest('.modal-content').length && !$(event.target).is("#portal-btn")) {
          $("#login-modal").hide();
      }
  });

  // click X to close modal
  $(".close").on("click", function() {
    $("#login-modal").hide();
  });

  // Click login parent portal to open modal or redirect
  $("#portal-btn").on("click", function() {
      checkUserToken(function() {
          window.location.href = 'dashboard.html';
      });
  });

  // Handle sign up
  $('#signup-btn').on('click', function(e) {
    e.preventDefault();
    const name = $('#name').val().trim();
    const email = $('#signup-email').val();
    const password = $('#signup-password').val();
    const confirmPassword = $('#confirm-password').val();

    // Validating name
    if (!name) {
        // better to display on screen than alert just fallowing requirements not altering html
        alert('Please enter your name.');
        return;
    }

    // validatin password
    function isValidPassword(password) {
        const minLength = 8;
        const hasNumber = /\d/;
        const hasLower = /[a-z]/;
        const hasUpper = /[A-Z]/;
        
        return (
            password.length >= minLength &&
            hasNumber.test(password) &&
            hasLower.test(password) &&
            hasUpper.test(password)
        );
    }

    // Check if the password is valid
    if (!isValidPassword(password)) {
        // better to display on screen than alert just fallowing requirements not altering html
        alert('Password must be at least 8 characters long and include at least one number, one lowercase and one uppercase letter.');
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        // better to display on screen than alert just fallowing requirements not altering html
        alert('Passwords do not match.');
        return;
    }

      $.ajax({
          url: `${BASE_URL}api/users`,
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ name: name, email: email, password: password }),
          success: function(token) {
              localStorage.setItem('userToken', token);
              window.location.href = 'dashboard.html';
          },
          error: function() {
            // better to display on screen than alert just fallowing requirements not altering html
              alert('Signup failed');
          }
      });
  });

  // Handle login
  $("#login-form").on("submit", function(event) {
      event.preventDefault();
      const email = $("#login-email").val();
      const password = $("#login-password").val();

      $.ajax({
          url: `${BASE_URL}api/users/login`,
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ email: email, password: password }),
          success: function(token) {
              localStorage.setItem('userToken', token);
              window.location.href = 'dashboard.html';
          },
          error: function() {
            // better to display on screen than alert just fallowing requirements not altering html
              alert('Login failed');
          }
      });
      $("#login-modal").hide();
  });
});
