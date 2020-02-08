window.onload = (function() {

    var currentUserCookie = getCookie("currentUser");
    var currentUser = JSON.parse(currentUserCookie);

    if (currentUser.role == "ADMIN") {
        var importButton = document.getElementById("importbtn");
        importButton.style.display = "block";
    }
});

function getCookie(name) {
    var pattern = RegExp(name + "=.[^;]*")
    matched = document.cookie.match(pattern)
    if (matched) {
        var cookie = matched[0].split('=')
        return cookie[1]
    }
    return false
}