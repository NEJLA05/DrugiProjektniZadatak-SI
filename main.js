const cards = [
  {
    title: "To do",
    cardId: 1,
  },
  {
    title: "In progress",
    cardId: 2,
  },
  {
    title: "Completed",
    cardId: 3,
  },
];

arrayList = [
  {
    id: 0,
    statusId: 1,
    description: "Buy food",
  },
  {
    id: 1,
    statusId: 1,
    description: "Wash car",
  },
  {
    id: 2,
    statusId: 2,
    description: "Make a meal",
  },
  {
    id: 3,
    statusId: 3,
    description: "Feed cat",
  },
  {
    id: 4,
    statusId: 3,
    description: "Make the bed",
  },
];

const cardsList = document.getElementById("cards-list");
function deleteItem(id) {
  const index = arrayList.findIndex((item) => item.id === id); 
  if (index !== -1) {
    
    arrayList.splice(index, 1); 
    var element = document.getElementById("delete-" + id);
    element.remove();
  }
}

function moveItem(id, statusId) {
  console.log(arrayList);

  const index = arrayList.findIndex((item) => item.id === id);
  if (index !== -1) {
    switch (statusId) {
      case 1:
        arrayList[index].statusId = statusId + 1; 
        updateView();
        break;

      case 2:
        arrayList[index].statusId = statusId + 1; 
        updateView();
        break;

      default:
        break;
    }
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
            <button class="status-change-button" 
              onclick="deleteItem(${status.id})"
            >
            <i class="bi bi-trash3"></i>
            </button>`;
        }
        if (status.statusId != 3) {
          cardContent += `
            <button 
              class="status-change-button"
              onclick="moveItem(${status.id}, ${status.statusId})"
              >
              <i class="bi bi-arrow-right"></i>
            </button>`;
        }
        cardContent += `</div></div>`;
      }
    });
    cardContent += `</div>`;
    if (card.cardId == 1) {
      cardContent += `<div id="button-container" class="text-center">
        <button 
          id="add-task-button"
          class="add-task-button"
          onclick="addItem()"
          >
          Add
        </button>
        <button 
          id="toggle-input-button"
          class="toggle-input-button mt-3" 
          onclick="showInput()"
          >
          Add task
        </button>
        <input 
          id="input-task" 
          class="form-control input-task mt-3 
          type="text" 
          placeholder="Enter task"
          >
        <div 
          id="validation-message" 
          class="text-danger validation-message 
          text-start"
          >
          Field cannot be empty.
        </div>
      </div>
      `;
    }
   
    cardContent += `
    </div>`;

    
    cardElement.innerHTML = cardContent;

    cardsList.appendChild(cardElement);
  });

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

function addItem() {
  const regex = /^\s*$/;
  var newId = arrayList.length;
  var value = document.getElementById("input-task").value;
  var validation = document.getElementById("validation-message");

  if (regex.test(value)) {
    validation.style.display = "block";
  } else {
    arrayList.push({
      id: newId,
      statusId: 1,
      description: value,
    });
    updateView();
  }
}

updateView();
