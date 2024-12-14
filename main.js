const cards = [
  {
    title: "To do",
    text: " ",
    cardId: 1,
  },
  {
    title: "In progress",
    text: " ",
    cardId: 2,
  },
  {
    title: "Completed",
    text: " ",
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
    description: "Buy food",
  },
];

const cardsList = document.getElementById("cards-list");
function deleteItem(id) {
  console.log(id);

  const index = arrayList.findIndex((item) => item.id === id); // Find the index by id
  if (index !== -1) {
    // If the item exists
    arrayList.splice(index, 1); // Remove the item at the found index
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
        arrayList[index].statusId = 2; // Update the name property of the object
        updateView();
        break;

      case 2:
        arrayList[index].statusId = 3; // Update the name property of the object
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
    cardElement.className = "card mx-3";

    // Build the card's content
    let cardContent = `
        <div class="card-body">
          <h5 class="card-title">${card.title}</h5>
          <p class="card-text">${card.text}</p>
      `;

    // Add related items from arrayList
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

    if (card.cardId == 1) {
      cardContent += `<div id="button-container" class="text-center">
        <button id="add-task-button" onclick="addItem()">Add</button>
        <button 
          id="toggle-input-button"
          class="toggle-input-button mt-3" 
          onclick="showInput()"
          >
          Add task
        </button>
        <input id="input-task" class="input-task type="text" placeholder="Enter task">
      </div>
      `;
    }
    // Close the list and add a button
    cardContent += `
    </div>`;

    // Set the card's content
    cardElement.innerHTML = cardContent;

    // Append the card to the cardsList container
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
    toggleButton.innerHTML += `<i class="bi bi-plus-lg"></i>`;
    addButton.style.display = "none";
  }
}

function addItem() {
  var newId = arrayList.length;
  var value = document.getElementById("input-task").value;

  arrayList.push({
    id: newId,
    statusId: 1,
    description: value,
  });
  updateView();
}

updateView();
