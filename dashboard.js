$(document).ready(function() {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
        window.location.href = 'index.html'; 
    }
});