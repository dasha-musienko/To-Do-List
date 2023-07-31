const containerEl = document.querySelector(".container");
const inputEl = document.querySelector("#input");
const addBtnEl = document.querySelector(".input-button");
const taskCountEl = document.querySelector(".tasks-count");
const tasksContainerEl = document.querySelector(".tasks-container");
const sSymb = document.querySelector(".to-add-s");
const titleEl = document.querySelector(".title");
const cursorEl = document.querySelector(".cursor");

taskCountEl.textContent = "0";
let tasksText = "";
let innerHtmlEl = "";

//cursor settings



document.addEventListener("mousemove", cursorMoveHandler);
function cursorMoveHandler(e) {
  cursorEl.style.top = e.clientY + "px";
  cursorEl.style.left = e.clientX + "px";
}

containerEl.addEventListener("mouseover", containeMouseEnterHandler);
function containeMouseEnterHandler(event) {
  if (event.target.closest("li") || event.target.closest(".input-container")) {
    cursorEl.classList.add("hide-cursor");
  } else {
    cursorEl.classList.add("focus");
  }
}

containerEl.addEventListener("mouseout", containeMouseLeaveHandler);

function containeMouseLeaveHandler() {
  cursorEl.classList.remove("focus");
  cursorEl.classList.remove("hide-cursor");
}

titleEl.addEventListener("mouseover", titleElMouseOverHandler);
function titleElMouseOverHandler() {
  cursorEl.classList.add("title-cursor");
}

titleEl.addEventListener("mouseout", titleElMouseOutHandler);
function titleElMouseOutHandler() {
  cursorEl.classList.remove("title-cursor");
}

// input listener
inputEl.addEventListener("input", inputHandler);

function inputHandler(event) {
  if (event.currentTarget.value.trim().length > 50) {
    window.alert("Maximum symbols - 50");
    return;
  }
  tasksText = event.currentTarget.value.trim();
}

// btn listener
addBtnEl.addEventListener("click", addBtnClickHandler);

function addBtnClickHandler() {
  if (inputEl.value.trim().length < 1) {
    window.alert("Enter min 1 symbol");
  } else {
    addsTasksIntoContainer()
    countsTasks()
    checksIfTaskIsPlural();
  }

  inputEl.value = "";
}

function addsTasksIntoContainer () {
  innerHtmlEl = `
    <li class="task-item">
    <svg class="radio-btn" width="26" height="26">
    <use href="./pics/symbol-defs.svg#icon-radio-icon"></use>
    </svg><div class="task-text-container">${tasksText}</div>
    <svg class="trash-btn" width="26" height="26">
    <use href="./pics/symbol-defs.svg#icon-trash-icon"></use>
    </svg>
    </li>`;
    tasksContainerEl.insertAdjacentHTML("afterbegin", innerHtmlEl);
}

function countsTasks () {
  taskCountEl.textContent = (
    tasksContainerEl.children.length -
    [...tasksContainerEl.children].filter((el) =>
      [...el.classList].includes("checked")
    ).length
  ).toString();
}


// task click listener
tasksContainerEl.addEventListener("click", tasksContainerClickHandler);

function tasksContainerClickHandler(event) {
  const task = event.target.closest("li")
  if (
    task.tagName === "LI" ||
    event.target.classList.contains("radio-btn")
  ) {
    addClassCheckedintoTask(task);
    decrementsTasksCounter (task);
    incrementsTasksCounter (task);
  }
  checksIfTaskIsPlural();
}

function addClassCheckedintoTask (task) {
  task.classList.toggle("checked")
}
function decrementsTasksCounter (task) {
  if (task.classList.contains("checked")) {
    taskCountEl.textContent = (+taskCountEl.textContent - 1).toString();
  }
}
function incrementsTasksCounter (task) {
  if (
    task.tagName === "LI" &&
    !task.classList.contains("checked")
  ) {
    taskCountEl.textContent = (+taskCountEl.textContent + 1).toString();
  }
}



// delete btn listener
tasksContainerEl.addEventListener("click", delBtnClickHandler);

function delBtnClickHandler(event) {
  console.log();
  if (event.target.closest(".trash-btn")) {
    if (!event.target.closest("li").classList.contains("checked")) {
      taskCountEl.textContent = (+taskCountEl.textContent - 1).toString();
    }
    event.target.closest("li").remove();
  }

  checksIfTaskIsPlural();
}


function checksIfTaskIsPlural() {
  if (+taskCountEl.textContent !== 1) {
    sSymb.textContent = "s";
  } else {
    sSymb.textContent = "";
  }
}

document.addEventListener("mouseover", (e) => {
  cursorEl.classList.remove("initially-hidden")
})


document.addEventListener("mouseleave", function(event){

  if(event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight))
  {
    cursorEl.classList.add("initially-hidden")
  }
});