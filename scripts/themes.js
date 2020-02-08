$(document).ready(function() {
  getThemes("../src/themes.php");
});

function getThemes(url) {
  fetch(url)
    .then(response => response.text())
    .then(data => displayPresentations(data))
    .catch(error => console.log(error));
}

function displayPresentations(data) {
  JSON.parse(data).themes.forEach(element => {
    addRow(element.Theme, element.Type);
  });

  $("#table").scrollTableBody();
}

function addRow(theme, type) {
  let table = document.getElementById("table");
  let row = table.insertRow();

  let themeCell = row.insertCell(0);
  let typeCell = row.insertCell(1);

  themeCell.innerText = theme;
  typeCell.innerText = type;
}

$(window)
  .on("load resize ", function() {
    let scrollWidth =
      $(".tbl-content").width() - $(".tbl-content table").width();
    $(".tbl-header").css({ "padding-right": scrollWidth });
  })
  .resize();
