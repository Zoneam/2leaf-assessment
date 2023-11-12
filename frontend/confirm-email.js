$(document).ready(function() {
    const token = new URLSearchParams(window.location.search).get('token');

    $.ajax({
        url: `${BASE_URL}api/users/confirm-email?token=${token}`,
        method: 'POST',
        success: function(res) {
            $('#message').text('Email confirmed successfully!');
            setTimeout(() => window.location.href = 'dashboard.html', 3000);
        },
        error: function() {
            $('#message').text('Error confirming email. Please try again.');
        }
    });
});
