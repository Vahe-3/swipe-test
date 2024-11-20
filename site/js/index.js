// dev. rubic-on.com
document.addEventListener("DOMContentLoaded", () => {
  // parallax bg
  let meteor = document.querySelectorAll(".meteorite");
  if (meteor) {
    if (window.innerWidth >= 1281) {
      for (let el = 0; el < meteor.length; el++) {
        window.addEventListener("mousemove", function (e) {
          let x = e.clientX / window.innerWidth;
          let y = e.clientY / window.innerHeight;
          meteor[el].style.transform =
            "translate(-" + x * 25 + "px, -" + y * 25 + "px)";
        });
      }
    }
  }
  const cardItem = document.querySelectorAll(".card");
  for (let e = 0; e < cardItem.length; e++) {
    cardItem[e].addEventListener("mouseover", (e) => {
      cardItem[0].classList.remove("active");
    });
  }
  // nav
  const navbtns = document.querySelectorAll(".navbtns span");
  const elHead = document.getElementById("head").offsetTop;
  const elRules = document.getElementById("rules").offsetTop;
  const elInformer = document.getElementById("informer").offsetTop;
  if (navbtns[0]) {
    addEventListener("scroll", () => {
      if (elHead < window.scrollY) {
        clearnavbtns();
        navbtns[0].classList.add("active");
      }
      if (elRules < window.scrollY) {
        clearnavbtns();
        navbtns[1].classList.add("active");
      }
      if (elInformer < window.scrollY) {
        clearnavbtns();
        navbtns[2].classList.add("active");
      }
      function clearnavbtns() {
        for (let e = 0; e < navbtns.length; e++) {
          navbtns[e].classList.remove("active");
        }
      }
    });
  }
});
