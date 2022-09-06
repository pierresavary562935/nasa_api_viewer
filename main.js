let xmlhttp = new XMLHttpRequest();

// Query contructor
let queryURL = "https://api.nasa.gov/planetary/apod?";
let queryKey = "api_key=JbKDWFQmQuieuZqiLJ1KPgNbJf8HtJ0rXZJT0s4R&";
//let queryDate = "date=" + "2021-5-24" + "&";
var queryFull = queryURL + queryKey;

var date = new Date();
var todayDate = date.toLocaleDateString();

document.getElementById("suivant").style.visibility = "hidden";

var first_load = false;
if (first_load == false) {
  updateView();
  first_load = true;
}

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let data = JSON.parse(this.responseText);

    let date = data["date"];
    let explanation = data["explanation"];
    let url = data["url"];
    let media_type = data["media_type"];
    let title = data["title"];

    let imageType = `
    <a class="ripple" href="#!">
        <img id="wrapper-image" alt="" class="img-fluid rounded" src="" />
    </a>
    `;

    let videoType = `
    <div class="ratio ratio-16x9">
        <iframe id="wrapper-video" src="" allowfullscreen></iframe>
    </div>
    `;

    document.getElementById("wrapper-title").innerHTML = title;
    document.getElementById("wrapper-date").innerHTML = date;
    document.getElementById("wrapper-explanation").innerHTML = explanation;

    if (media_type == "video") {
      document.getElementById("wrapper-media").innerHTML = videoType;
      document.getElementById("wrapper-video").src = url;
    } else {
      document.getElementById("wrapper-media").innerHTML = imageType;
      document.getElementById("wrapper-image").src = url;
    }
  }
};

function jourprecedent() {
  date.setDate(date.getDate() - 1);
  var month = date.getMonth() + 1;

  queryFull = queryURL + queryKey + "date=" + date.getFullYear() + "-" + month + "-" + date.getDate() + "&";
  document.getElementById("suivant").style.visibility = "visible";

  updateView();
}

function joursuivant() {
  date.setDate(date.getDate() + 1);
  var month = date.getMonth() + 1;

  queryFull = queryURL + queryKey + "date=" + date.getFullYear() + "-" + month + "-" + date.getDate() + "&";
  if (date.toLocaleDateString() == todayDate) {
    document.getElementById("suivant").style.visibility = "hidden";
  }
  updateView();
}

function updateView() {
  xmlhttp.open("GET", queryFull, true);
  xmlhttp.send();
}
