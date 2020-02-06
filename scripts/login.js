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

    event.preventDefault();

    var userName = document.getElementById('user-name').value;
    var password = document.getElementById('password').value;

    var data = {
        userName: userName,
        facultyNumber: password
    };

    login('http://localhost/phpLabs/PresentationCalendar/src/login.php', { method: 'POST', data: `data=${JSON.stringify(data)}` });
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
}

function load(response) {
    if (response.success) {
        debugger;
        window.location = '../html/calendar.html';
        console.log("success");
    } else {
        console.log(response)
    }
}
