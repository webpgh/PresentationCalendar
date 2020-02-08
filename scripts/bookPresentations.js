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
    debugger;
}