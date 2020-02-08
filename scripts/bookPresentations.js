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