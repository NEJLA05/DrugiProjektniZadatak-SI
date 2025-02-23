import {
  getTasksFromFirestore,
  addTaskToFirestore,
  deleteTaskFromFirestore,
  updateTaskInFirestore,
} from "./firebase.js";

const cards = [
  { title: "To do", cardId: 1 },
  { title: "In progress", cardId: 2 },
  { title: "Completed", cardId: 3 },
];

var arrayList = [];

const cardsList = document.getElementById("cards-list");

function getData() {
  getTasksFromFirestore()
    .then((tasks) => {
      tasks.forEach((task) => {
        if (!taskExists(task.id)) {
          arrayList.push(task);
        }
      });
      updateView();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function addItem() {
  const regex = /^\s*$/;
  var value = document.getElementById("input-task").value;
  var validation = document.getElementById("validation-message");

  if (regex.test(value)) {
    validation.style.display = "block";
  } else {
    addTaskToFirestore({ description: value, statusId: 1 });
    getData();
  }
}

function deleteItem(id) {
  deleteTaskFromFirestore(id).then(() => {
    arrayList = [];
    getData();
  });
}

function moveItem(id, statusId) {
  const index = arrayList.findIndex((item) => item.id === id);
  if (index !== -1) {
    switch (statusId) {
      case 1:
        updateTaskInFirestore({ id: id, statusId: 2 });
        break;
      case 2:
        updateTaskInFirestore({ id: id, statusId: 3 });
        break;
      default:
        break;
    }
    arrayList = [];
    getData();
  }
}

function updateView() {
  cardsList.innerHTML = "";
  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.className = "card col-10 col-md-5 col-lg-3 m-3";

    let cardContent = `
        <div class="card-body">
          <h5 class="card-title text-light mb-3">${card.title}</h5>
          <div class="task-container">
      `;

    arrayList.forEach((status) => {
      if (status.statusId === card.cardId) {
        cardContent += `<div id="delete-${status.id}" class="status mb-1">${status.description} <div>`;

        if (status.statusId == 1) {
          cardContent += `
            <button class="status-change-button delete-btn" data-id="${status.id}">
              <i class="bi bi-trash3"></i>
            </button>`;
        }

        if (status.statusId != 3) {
          cardContent += `
            <button 
              class="status-change-button move-btn" 
              data-id="${status.id}" 
              data-status="${status.statusId}">
              <i class="bi bi-arrow-right"></i>
            </button>`;
        }

        cardContent += `</div></div>`;
      }
    });

    cardContent += `</div>`;

    if (card.cardId == 1) {
      cardContent += `
        <div id="button-container" class="text-center">
          <button id="add-task-button" class="add-task-button">
            Add
          </button>
          <button id="toggle-input-button" class="toggle-input-button mt-3">
            Add task
          </button>
          <input id="input-task" class="form-control input-task mt-3" type="text" placeholder="Enter task">
          <div id="validation-message" class="text-danger validation-message text-start">
            Field cannot be empty.
          </div>
        </div>
      `;
    }

    cardContent += `</div>`;
    cardElement.innerHTML = cardContent;
    cardsList.appendChild(cardElement);
  });

  attachEventListeners();
  showInput();
}

function showInput() {
  var input = document.getElementById("input-task");
  var toggleButton = document.getElementById("toggle-input-button");
  var addButton = document.getElementById("add-task-button");

  if (input.style.display === "none") {
    input.style.display = "inline";
    toggleButton.textContent = "Close task";
    toggleButton.innerHTML += "";
    addButton.style.display = "inline";
  } else {
    input.style.display = "none";
    toggleButton.textContent = "Add task";
    toggleButton.innerHTML += `<i class="bi bi-plus-lg ms-2"></i>`;
    addButton.style.display = "none";
  }
}

function attachEventListeners() {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = button.getAttribute("data-id");
      deleteItem(id);
    });
  });

  const moveButtons = document.querySelectorAll(".move-btn");
  moveButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = button.getAttribute("data-id");
      const statusId = button.getAttribute("data-status");
      moveItem(id, parseInt(statusId));
    });
  });

  document
    .getElementById("toggle-input-button")
    .addEventListener("click", showInput);
  document.getElementById("add-task-button").addEventListener("click", addItem);
}

function taskExists(taskId) {
  return arrayList.some((task) => task.id === taskId);
}

getData();
