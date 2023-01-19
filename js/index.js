let $ = (id) => document.getElementById(id);

const contenido = $("contenido");
const windows = $("windows");
const windowsFilms = $("windowsFilms");

const urlVideos = [
  "https://www.youtube.com/embed/ubyYH4DtJuY",
  "https://www.youtube.com/embed/T9-SJ6ikuj0",
  "https://www.youtube.com/embed/P27C_QVsq7Y",
  "https://www.youtube.com/embed/C-YZiAXcbY8",
  "https://www.youtube.com/embed/frdj1zb9sMY",
  "https://www.youtube.com/embed/xGHfkRbGypk",
];

addEventListener("click", (e) => {
  e.stopPropagation();
  e.target.classList.contains("card-img") ? show(e) : "";
  e.target.classList.contains("btn") ? close() : "";
  e.target.classList.contains("windows-modal") ? close() : "";
});

function show(e) {
  switch (e.target.alt) {
    case "img1":
      windows.classList.toggle("hidden");
      windowsFilms.src = urlVideos[0];
      break;
    case "img2":
      windows.classList.toggle("hidden");
      windowsFilms.src = urlVideos[1];
      break;
    case "img3":
      windows.classList.toggle("hidden");
      windowsFilms.src = urlVideos[2];
      break;
    case "img4":
      windows.classList.toggle("hidden");
      windowsFilms.src = urlVideos[3];
      break;
    case "img5":
      windows.classList.toggle("hidden");
      windowsFilms.src = urlVideos[4];
      break;
    case "img6":
      windows.classList.toggle("hidden");
      windowsFilms.src = urlVideos[5];
      break;
  };
};

function close() {
  windows.classList.toggle("hidden");
  windowsFilms.src = "";
};


// Canvas Star Wars

// DOM selectors
const stars = document.getElementById('stars');
const starsCtx = stars.getContext('2d');

// global variables
let screen, starsElements, starsParams = { speed: 2, number: 300, extinction: 4 };

// run stars
setupStars();
updateStars();


// update stars on resize to keep them centered
window.onresize = function() {
    setupStars();
};

// star constructor
function Star() {
    this.x = Math.random() * stars.width;
    this.y = Math.random() * stars.height;
    this.z = Math.random() * stars.width;

    this.move = function() {
        this.z -= starsParams.speed;
        if (this.z <= 0) {
            this.z = stars.width;
        }
    };

    this.show = function() {
        let x, y, rad, opacity;
        x = (this.x - screen.c[0]) * (stars.width / this.z);
        x = x + screen.c[0];
        y = (this.y - screen.c[1]) * (stars.width / this.z);
        y = y + screen.c[1];
        rad = stars.width / this.z;
        opacity = (rad > starsParams.extinction) ? 1.5 * (2 - rad / starsParams.extinction) : 1;

        starsCtx.beginPath();
        starsCtx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
        starsCtx.arc(x, y, rad, 0, Math.PI * 2);
        starsCtx.fill();
    }
}

// setup <canvas>, create all the starts
function setupStars() {
    screen = {
        w: window.innerWidth,
        h: window.innerHeight,
        c: [ window.innerWidth * 0.5, window.innerHeight * 0.5 ]
    };
    window.cancelAnimationFrame(updateStars);
    stars.width = screen.w;
    stars.height = screen.h;
    starsElements = [];
    for (let i = 0; i < starsParams.number; i++) {
        starsElements[i] = new Star();
    }
}

// redraw the frame
function updateStars() {
    starsCtx.fillStyle = "black";
    starsCtx.fillRect(0, 0, stars.width, stars.height);
    starsElements.forEach(function (s) {
        s.show();
        s.move();
    });
    window.requestAnimationFrame(updateStars);
}