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
    const presentation = {
      startDate: element[3],
      endDate: element[4],
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
    onDateSelect: function(date, events) {
      let button = document.createElement("button");
      button.innerHTML = "Добави презентация";
      button.className = "insertPresentationDate";
      endDate = getEndDateForCurrentEvents(date, events);
      const encodedDate = encodeURIComponent(endDate);
      button.onclick = function() {
        redirectToBookPresentation(encodedDate);
      };

      $(".event-container").append(button);
    }
  });
}

function getEndDateForCurrentEvents(date, events) {
  if (!(Array.isArray(events) && events.length)) {
    return new Date(new Date(date).getTime() - 240 * 60000).toISOString();
  }

  events.sort(function(a, b) {
    const aDate = new Date(a.endDate);
    const bDate = new Date(b.endDate);

    return aDate.getTime() - bDate.getTime();
  });
  return events[events.length - 1].endDate;
}

function redirectToBookPresentation(date) {
  location.href = `../html/bookPresentations.html?date=${date}`;
}

$(document).ready(function() {
  getPresentations("../src/calendar.php");
});
