$(document).ready(function() {
    const userToken = localStorage.getItem('userToken');
    console.log(userToken);
    if (userToken) {
        $.ajax({
            url: 'http://localhost:3001/api/users/check-token', 
            type: 'POST',
            headers: { 'Authorization': 'Bearer ' + userToken },
            success: function(response) {
                console.log('Token is valid',response);
                $('#dashboard-content').show();
                $('#welcome-name').text(`Welcome back ${response.name}`);
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