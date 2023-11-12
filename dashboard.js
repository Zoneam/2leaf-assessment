$(document).ready(function() {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
        $.ajax({
            url: 'http://localhost:3001/api/users/check-token', 
            type: 'POST',
            headers: { 'Authorization': 'Bearer ' + userToken },
            success: function(response) {
                console.log('Token is valid');
                $('#dashboard-content').show();
            },
            error: function() {
                // Token is invalid or expired
                console.log('Token is invalid');
                localStorage.removeItem('userToken');
                window.location.href = 'index.html';
            }
        });
    } else {
        window.location.href = 'index.html';
    }
});