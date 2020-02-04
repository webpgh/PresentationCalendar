(function () {

    /**
     * Get the login button
     */
    var loginButton = document.getElementById('login');

    /**
     * Validate the form before sending it
     */
    loginButton.addEventListener('click', validateForm);

    /**
     * Send the form
     */
    loginButton.addEventListener('click', sendForm);

})();

function validateForm(event) {
    var userName = document.getElementById('user-name').value;
    var password = document.getElementById('password').value;

    if (userName == '' || password == '') {
        alert('User name and password cannot be empty!')
    }
}

function sendForm(event) {
    var userName = document.getElementById('user-name').value;
    var password = document.getElementById('password').value;

    var user = {
        userName: userName,
        password: password
    };

    login('src/login.php', { method: 'POST', data: `data=${JSON.stringify(user)}` });
}

function login(url, settings) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: settings.data
    })
        .then(response => response.json())
        .then(data => load(data))
        .catch(error => console.log(error));
}

function load(response) {
    if (response.success) {
        window.location = 'calendar.html';
    } else {
        console.log(response)
    }
}