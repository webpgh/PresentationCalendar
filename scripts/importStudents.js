window.onload = (function() {

    const currentUserCookie = getCookie("currentUser");
    const currentUser = JSON.parse(currentUserCookie);

    if (currentUser.role == "ADMIN") {
        const importButton = document.getElementById("importbtn");
        const exportbtn = document.getElementById("exportbtn");
        importButton.style.display = "block";
        exportbtn.style.display = "block";
    }
});

function backToHomePage() {
    window.location.replace("../html/calendar.html");
}

function getCookie(name) {
    const pattern = RegExp(name + "=.[^;]*")
    matched = document.cookie.match(pattern)
    if (matched) {
        const cookie = matched[0].split('=')
        return cookie[1]
    }
    return false
}