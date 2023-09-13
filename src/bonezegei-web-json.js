const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var contentString = urlParams.get("c"); //content

//console.log(contentString);

var URL = "http://192.168.254.103:5500/";

function setHeader() {
  document.write(
    "<!DOCTYPE html>" +
      "<html>" +
      "<head>" +
      '<meta name="viewport" content="width=device-width, initial-scale=1" />' +
      '<link rel="stylesheet" href="src/bonezegei-web.css" />' +
      '<script src="src/bonezegei-web.js"></script>' +
      "</head>;"
  );
}

function getNavigationBar() {
  var finalUrl = URL + "resources/menu.json";
  fetch(finalUrl)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (!data) {
        console.log("error");
      }
      // console.log(data);

      for (var a = 0; a < data.menu.link.length; a++) {
        document.write(data.menu.link[a].title + "<br>");

        if (data.menu.link[a].sub.length) {
          for (var b = 0; b < data.menu.link[a].sub.length; b++) {
            document.write(
              "---[" + b + "]" + data.menu.link[a].sub[b].title + "<br>"
            );
          }
        }
      }
    });
}

function setNavigationBar() {
  var finalUrl = URL + "resources/menu.json";
  var navString =
    '<div class="navbar"> <div class="container nav-container"><input class="checkbox" type="checkbox" name="" id="" />';

  fetch(finalUrl)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (!data) {
        console.log("error");
      }

      //get Logo
      navString +=
        '<div class="logo">' +
        "<img " +
        'src="' +
        data.menu.logo.src +
        '"' +
        'alt="' +
        data.menu.logo.name +
        '"/>' +
        "</div>" +
        '<div class="logo" style="margin-left: 20px">' +
        "<h1>" +
        data.menu.logo.name +
        "</h1></div>";

      //get Links
      navString += '<div class="menu-items">';
      for (var a = 0; a < data.menu.link.length; a++) {
        if (data.menu.link[a].src !== "none") {
          navString +=
            '<li><a href="?c=' +
            data.menu.link[a].src +
            '" >' +
            data.menu.link[a].title +
            "</a>";
        } else {
          navString += "<li><a>" + data.menu.link[a].title + "</a>";
        }

        if (data.menu.link[a].sub.length) {
          navString += '<div class="submenu-items">';
          for (var b = 0; b < data.menu.link[a].sub.length; b++) {
            navString +=
              '<a href="?c=' +
              data.menu.link[a].sub[b].src +
              '">' +
              data.menu.link[a].sub[b].title +
              "</a>";
          }
          navString += "</div>";
        }
        navString += "</li>";
      }
      navString += "<li ></li></div>";
      //set hamburger
      navString +=
        '<div class="hamburger-lines"><span class="line line1"></span><span class="line line2"></span><span class="line line3"></span></div>';
      navString += "</div></div>";
      nav.innerHTML = navString;
    });
}
function UrlExists(url) {
  var http = new XMLHttpRequest();
  http.open("HEAD", url, false);
  http.send();
  return http.status;
}

function setContent() {
  if (!contentString) {
    contentString = "resources/home";
  }
  if (contentString === "none") {
    console.log("skip");
  } else {
    setNavigationBar();
    var finalContent = URL + contentString + ".json";

    var URLData = UrlExists(finalContent);
    console.log("T:" + URLData);
    var contString = "";
    var t = fetch(finalContent)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.content[0].type === "container") {
          contString +=
            '<div class="' +
            data.content[0].type +
            '" style="background-color: white; display: block; ">';
        }
        for (var a = 0; a < data.content.length; a++) {
          if (data.content[a].type === "title") {
            contString += "<title>" + data.content[a].text + "</title>";
          } else if (data.content[a].type === "heading") {
            contString += '<h2 class="title">' + data.content[a].text + "</h2>";
          } else if (data.content[a].type === "p") {
            contString +=
              '<p style="  text-align: justify; text-justify: inter-word;">' +
              data.content[a].text +
              "</p>";
          } else if (data.content[a].type === "break") {
            contString += "<br>";
          }
        }
        contString += "</div>";
        content.innerHTML = contString;
      });
  }
}
