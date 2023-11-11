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
    if ($(event.target).hasClass("modal")) {
      $("#login-modal").hide();
    }
  });

// click login parent portal to open modal
  $("#portal-btn").on("click", function() {
    $("#login-modal").show();
  });

// Handle logun 
  $("#login-form").on("submit", function(event) {
    event.preventDefault();
    const username = $("#username").val();
    const password = $("#password").val();
    console.log("Username: " + username + ", Password: " + password);
    // login logic back end axios ....
    $("#login-modal").hide();
  });
});
