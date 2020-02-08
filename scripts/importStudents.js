window.onload = (function() {

    const currentUserCookie = getCookie("currentUser");
    const currentUser = JSON.parse(currentUserCookie);
debugger;
    if (currentUser.role == "ADMIN") {
        const importButton = document.getElementById("importbtn");
        importButton.style.display = "block";
    }
});

function getCookie(name) {
    const pattern = RegExp(name + "=.[^;]*")
    matched = document.cookie.match(pattern)
    if (matched) {
        const cookie = matched[0].split('=')
        return cookie[1]
    }
    return false
}