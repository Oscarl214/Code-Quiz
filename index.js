let header = document.querySelector("header");
let home = document.querySelector(".start-container");
let startBtn = document.querySelector("button");
let timer = document.querySelector(".time");

let countdown = function () {
  var time = 60;

  var timeInterval = setInterval(function () {
    if (time >= 0) {
      timer.textContent = time;
      time--;
    } else if (time === 0) {
      timer.textContent = "Game is Over, Try Again";
      clearInterval(timeInterval);
    }
  }, 1000);
};

startBtn.addEventListener("click", function (e) {
  e.preventDefault();
  home.remove();
  countdown();
});
