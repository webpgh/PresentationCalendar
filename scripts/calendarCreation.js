function logout() {
  window.location.replace("http://localhost/phpLabs/PresentationsCalendar/html/index.html");
}

function getPresentations(url) {
  fetch(url)
    .then(response => response.text())
    .then(data => preparePresentationsForCalendar(data))
    .catch(error => console.log(error));
}

function preparePresentationsForCalendar(response) {
  const presentations = JSON.parse(response).presentations;
  let presentationsArrayForCalendar = [];

  presentations.forEach(element => {
    const startDate = new Date(element[3]);
    const presentation = {
      startDate: element[3],
      endDate: element[3],
      summary: `Презентация на тема "${element[1]}" от ${element[0]}`
    };
    presentationsArrayForCalendar.push(presentation);
  });

  createCalendar(presentationsArrayForCalendar);
}

function createCalendar(presentations) {
  $("#container").simpleCalendar({
    months: [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december"
    ],
    days: [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ],

    displayYear: true, // Display year in header
    fixedStartDay: true, // Week begin always by monday
    displayEvent: true, // Display existing event
    events: presentations, // List of events

    onInit: function(calendar) {}, // Callback after first initialization
    onMonthChange: function(month, year) {}, // Callback on month change
    onDateSelect: function(date, events) {}
  });
}

$(document).ready(function() {
  getPresentations("../src/calendar.php");
});
