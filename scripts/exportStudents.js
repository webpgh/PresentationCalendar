function exportStudents() {

    var presentationsCookie = getCookie("presentations");
    var presentations = JSON.parse(presentationsCookie);

    exportData("../src/exportToCsv.php", { method: 'POST', data: `data=${JSON.stringify(presentations)}` });
};

function exportData(url, settings) {
    debugger;
    fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: settings.data
        })
        .then(response => response)
        .then(data => {
            downloadFile("../exportedStudents/exported.csv");
        })

}

function downloadFile(requestUrl) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    var url = requestUrl;
    a.href = url;
    a.download = "export.csv";
    a.click();
}

function getCookie(name) {
    var pattern = RegExp(name + "=.[^;]*")
    matched = document.cookie.match(pattern)
    if (matched) {
        var cookie = matched[0].split('=')
        return cookie[1]
    }
    return false
}