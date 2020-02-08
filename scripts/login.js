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
        window.location = '../html/login.html';
    }
}

function sendForm(event) {

    /**
   * Prevent the default behavior of the clicking the form submit button
   */
    event.preventDefault();

    var userName = document.getElementById('user-name').value;
    var password = document.getElementById('password').value;

    var data = {
        userName: userName,
        facultyNumber: password
    };

    login('../src/login.php', { method: 'POST', data: `data=${JSON.stringify(data)}` });
}

function login(url, settings) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: settings.data
    })
        .then(response => response)
        .then(data => load(data))
}

function load(response) {
    if (response.ok) {
        window.location = '../html/calendar.html';
    } else {
        errors.innerHTML = response.data;
    }
}
