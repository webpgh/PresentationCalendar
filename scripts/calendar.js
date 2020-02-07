(function () {

    var currentUserCookie = getCookie("currentUser");

    var currentUser = JSON.parse(currentUserCookie);

    if (currentUser.role == "ADMIN") {
        document.getElementById("import-csv");
        var file = document.getElementById("import-csv");
        file.style.display = "block";
        // debugger;
        // fetch("http://localhost/phpLabs/PresentationCalendar/src/importFile.php", {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        //     },
        //     body: file
        // })
        //     .then(response => response.json())
        //     .then(data => load(data))
    }

})();

function getCookie(name) {
    var pattern = RegExp(name + "=.[^;]*")
    matched = document.cookie.match(pattern)
    if (matched) {
        var cookie = matched[0].split('=')
        return cookie[1]
    }
    return false
}