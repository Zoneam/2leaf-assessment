$(document).ready(function () {
  let currentIndex = 0;

  // Checking for token to display modal
  function checkUserToken(successCallback) {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
          $.ajax({
              url: 'http://localhost:3001/api/users/check-token',
              type: 'POST',
              headers: { 'Authorization': 'Bearer ' + userToken },
              success: function(res) {
                  console.log('Token is valid');
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
  function slideTo(index) {
      $(".slides").css("transform", `translateX(${-index * 50}%)`);
      currentIndex = index;
  }

  function nextSlide() {
      const totalSlides = $(".slides img").length;
      slideTo((currentIndex + 1) % totalSlides);
  }

  setInterval(nextSlide, 5000);

  // Click X to close modal
  $(".close").on("click", function() {
      $("#login-modal").hide();
  });

  // Click outside modal to close
  $(window).on("click", function(event) {
      if (!$(event.target).closest('.modal-content').length && !$(event.target).is("#portal-btn")) {
          $("#login-modal").hide();
      }
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
              localStorage.setItem('userToken', token);
              window.location.href = 'dashboard.html';
          },
          error: function() {
              alert('Signup failed');
          }
      });
  });

  // Handle login
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
