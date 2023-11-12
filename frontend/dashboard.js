
$(document).ready(function() {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
        $.ajax({
            url: `${BASE_URL}api/users/check-token`, 
            type: 'POST',
            headers: { 'Authorization': 'Bearer ' + userToken },
            success: function(response) {
                if (!response.isConfirmed) {
                    window.location.href = 'index.html';
                    alert('You have received an email. Please confirm your email address to proceed.');
                } else {
                    $('#dashboard-content').show();
                    $('#welcome-name').text(`Welcome back ${response.name}`);
                }
            },
            error: function() {
                localStorage.removeItem('userToken');
                window.location.href = 'index.html';
            }
        });
    } else {
        window.location.href = 'index.html';
    }
});