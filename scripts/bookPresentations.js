$(document).ready(function() {
    getAvailablePresentations("../src/bookPresentations.php");
  });

function getAvailablePresentations(url) {
    fetch(url)
    .then(response => response.text())
    .then(data => displayAvailablePresentations(data))
    .catch(error => console.log(error));
}

function displayAvailablePresentations(data) {
    JSON.parse(data).themes.forEach(element => {
        let option = document.createElement('option');
        option.value = element.ID;
        option.text = element.Theme;

        $('#selectMenu').append(option);
    });
}

function bookPresentation() {
    const params = (new URL(document.location)).searchParams;
    const date = new Date(params.get("date"));
    const selectedPresentationID = parseInt($('#selectMenu').val());
    const currentUser = JSON.parse(getCookie("currentUser"));

    const userPresentation = {
        date: date,
        presentationID: selectedPresentationID,
        currentUserID: currentUser["ID"]
    };

    debugger;
    sendData('../src/updateUserPresentations.php', { data: `data=${JSON.stringify(userPresentation)}` });

    
}