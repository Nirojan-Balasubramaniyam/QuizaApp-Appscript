const url =
  "https://script.google.com/macros/s/AKfycbznC30cOt4m-Hc-BYAiruu6I85SpkLss7dSJu7wmvslJJxZvMVJ4LSB8PtqXzjfjD52/exec";
const output = document.querySelector("#output");
const game = { question: 0, total: 0, data: [], score: 0 };

document.addEventListener("DOMContentLoaded", init);
function init() {
  output.innerHTML = "";
  const btn = document.createElement("button");
  btn.disabled = true;
  start(btn);
  game.question = 0;
  game.total = 0;
  game.score = 0;
  game.data = [];
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      game.total = data.data.length;
      game.data = data.data;
      btn.disabled = false;
    });
}

function start(btn) {
  const html = `Welcome to the Quiz. Press the button below to start the QUIZ. `;
  const div = maker("div", html, "message", output);
  output.append(div);
  btn.textContent = "Start Game";
  btn.classList.add("btn");
  div.append(btn);
  btn.addEventListener("click", loaderQuestion);
}

function loaderQuestion() {
  output.innerHTML = "";
  if (game.question >= game.total) {
    const html = `<h1>Game Over</h1><div>You got ${game.score} out of ${game.total} correct.</div>`;
    const div = maker("div", html, "message", output);
    const btn3 = maker("button", "Play Again", "btnPlayagain", div);
    btn3.addEventListener("click", init);
  } else {
    const div = maker("div", "", "message", output);
    const val = game.data[game.question];
    const question = maker("div", `${val.question}`, "message1", div);
    const optList = maker("div", "", "opts", div);
    val.arr.forEach((element) => {
      console.log(element);
      const temp = maker("div", element, "box", optList);
      temp.classList.add("box1");
      temp.myObj = {
        element: element,
        answer: val.answer,
      };
      temp.addEventListener("click", checker);
    });
  }
  console.log("Question");
}

function checker(e) {
  const val = e.target.myObj;
  console.log(val.answer);
  removeClicks();
  e.target.style.color = "white";

  if (val.element == val.answer) {
    game.score++;
    e.target.style.backgroundColor = "green";
    html = `<div class="correct">Correct Answer</div>`;
  } else {
    e.target.style.backgroundColor = "red";
    html = `<div class="wrong">Wrong Answer</div>`;
  }
  const parent = e.target.parentElement;
  console.log(parent);
  game.question++;
  const rep = game.question == game.total ? "End Game" : "Next Question";
  const feedback = maker("div", html, "message", parent);
  const btn2 = maker("button", "Next Question", "btnNext", parent);
  btn2.addEventListener("click", loaderQuestion);
}

function removeClicks() {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((ele) => {
    ele.removeEventListener("click", checker);
    ele.style.color = "#918a8a";
    ele.classList.remove("box1");
  });
}

function maker(elementType, html, cla, parent) {
  const ele = document.createElement(elementType);
  ele.innerHTML = html;
  ele.classList.add(cla);
  return parent.appendChild(ele);
}
