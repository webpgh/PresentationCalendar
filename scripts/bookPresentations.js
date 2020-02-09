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
    let option = document.createElement("option");
    option.value = element.ID;
    option.text = element.Theme;

    $("#selectMenu").append(option);
  });
}

function bookPresentation() {
  const params = new URL(document.location).searchParams;
  const date = new Date(params.get("date"));
  const selectedPresentationID = parseInt($("#selectMenu").val());
  const currentUser = JSON.parse(getCookie("currentUser"));
  const endDate = new Date(date.getTime() + 8 * 60000);
  const userPresentation = {
    currentUserID: currentUser["ID"],
    presentationID: selectedPresentationID,
    startDate: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes())),
    endDate: new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endDate.getHours(), endDate.getMinutes()))
  };

  sendData("../src/updateUserPresentations.php", {
    data: `data=${JSON.stringify(userPresentation)}`
  });
}

function sendData(url, settings) {

  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: settings.data
  })
    .then(response => response.text())
    .then(data => JSON.parse(data))
}