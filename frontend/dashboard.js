
$(document).ready(function() {
    const userToken = localStorage.getItem('userToken');
    console.log(userToken);
    if (userToken) {
        $.ajax({
            url: 'https://assessment2leaf-42f9c9ea473a.herokuapp.com/api/users/check-token', 
            type: 'POST',
            headers: { 'Authorization': 'Bearer ' + userToken },
            success: function(response) {
                console.log('Token is valid',response);
                if (!response.isConfirmed) {
                    window.location.href = 'index.html';
                    alert('Please confirm your email address');

                } else {
                    $('#dashboard-content').show();
                    $('#welcome-name').text(`Welcome back ${response.name}`);
                }
            },
            error: function() {
                console('Token is invalid');
                // localStorage.removeItem('userToken');
                // window.location.href = 'index.html';
            }
        });
    } else {
        window.location.href = 'index.html';
    }
});