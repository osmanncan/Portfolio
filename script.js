var words = ["tasarlıyorum", "geliştiriyorum", "yayına alıyorum", "ölçekliyorum", "iyileştiriyorum"];
var counter = 0;
var elem = document.getElementById("slide-up-out");
var themeToggle = document.querySelector("#theme_toggle__btn");
var cursorTrail = document.querySelector(".cursor-trail");
var cursorX = 0;
var cursorY = 0;
var trailDots = [];
var trailPositions = [];

function change() {
  if (!elem) {
    return;
  }

  elem.innerHTML = words[counter];
  counter++;

  if (counter >= words.length) {
    counter = 0;
  }
}

if (elem) {
  change();
  setInterval(change, 2000);
}

function enableDarkMode() {
  document.body.classList.remove("theme--light");
  document.body.classList.add("theme--dark");

  if (themeToggle) {
    themeToggle.setAttribute("aria-label", "Açık temaya geç");
  }
}

function enableLightMode() {
  document.body.classList.remove("theme--dark");
  document.body.classList.add("theme--light");

  if (themeToggle) {
    themeToggle.setAttribute("aria-label", "Koyu temaya geç");
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.contains("theme--light") ? enableDarkMode() : enableLightMode();
  });
}

if (cursorTrail && window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  var dotCount = 12;

  for (var index = 0; index < dotCount; index++) {
    var dot = document.createElement("span");
    dot.className = "cursor-trail__dot" + (index === 0 ? " is-head" : "");
    dot.style.opacity = String(1 - index / (dotCount + 2));
    dot.style.transform = "translate3d(-50%, -50%, 0) scale(" + (1 - index * 0.04) + ")";
    cursorTrail.appendChild(dot);
    trailDots.push(dot);
    trailPositions.push({ x: 0, y: 0 });
  }

  document.addEventListener("mousemove", function (event) {
    cursorX = event.clientX;
    cursorY = event.clientY;
    cursorTrail.classList.add("is-visible");
  });

  document.addEventListener("mouseleave", function () {
    cursorTrail.classList.remove("is-visible");
    trailDots.forEach(function (dot) {
      dot.classList.remove("is-hovering");
    });
  });

  document.querySelectorAll("a, button, .navlist__item, .work__item__btn, .footer__menu-item").forEach(function (target) {
    target.addEventListener("mouseenter", function () {
      trailDots[0].classList.add("is-hovering");
    });

    target.addEventListener("mouseleave", function () {
      trailDots.forEach(function (dot) {
        dot.classList.remove("is-hovering");
      });
    });
  });

  function animateCursor() {
    var previousX = cursorX;
    var previousY = cursorY;

    for (var i = 0; i < trailDots.length; i++) {
      var dotItem = trailDots[i];
      var point = trailPositions[i];
      point.x += (previousX - point.x) * (0.28 - i * 0.012);
      point.y += (previousY - point.y) * (0.28 - i * 0.012);
      dotItem.style.left = point.x + "px";
      dotItem.style.top = point.y + "px";
      previousX = point.x;
      previousY = point.y;
    }

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}