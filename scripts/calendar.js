(function () {

    var currentUserCookie = getCookie("currentUser");

    var currentUser = JSON.parse(cookie);

    console.log('kostawe');
    debugger;

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