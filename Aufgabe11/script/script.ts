interface Task {
  content: String;
  status: Boolean; //true = done, false = to do
  color: String;
  emoji: String;
}

let allTasks: Task[] = [
  {
    content: "New! Create tasks with your voice (choose the emoji first)",
    status: true,
    color: "green",
    emoji: "⭐"
  },
  {
    content: "Click the cat to categorise your Task",
    status: false,
    color: "green",
    emoji: "😻"
  },
  {
    content: "Press 'Enter' to focus on input field",
    status: true,
    color: "red",
    emoji: "🙀"
  },
  {
    content: "Hover / tap Task to delete",
    status: false,
    color: "green",
    emoji: "😿"
  }
];

let inputField: HTMLInputElement;
let plusButton: HTMLElement;
let taskElement: HTMLElement;
let emojiButton: HTMLElement;
let popup: HTMLElement;
let stats: HTMLElement;
let closeEmoji: HTMLElement;

let currentEmoji: string = "😺";

window.addEventListener("load", function (): void {
  inputField = document.querySelector(".inputTask");
  plusButton = document.querySelector("#addButton");
  taskElement = document.querySelector(".tasks");
  emojiButton = document.querySelector(".catButton");
  popup = document.querySelector("#emojiMenu");
  stats = document.querySelector("#stats");
  closeEmoji = document.querySelector(".closeEmoji");

  emojiButton.addEventListener("click", togglePopup);
  closeEmoji.addEventListener("click", togglePopup);
  //Hinzufügen bei Bestätigung (klick auf Plus oder Enter)
  plusButton.addEventListener("click", addTask);
  document.addEventListener("keydown", function (pressed: KeyboardEvent): void {
    if (pressed.keyCode === 13) {
      addTask();
      inputField.focus();
    }
  });
  let selectedEmoji: HTMLCollection = document.getElementsByClassName(
    "selectEmoji"
  );
  for (let f: number = 0; f < selectedEmoji.length; f++) {
    selectedEmoji[f].addEventListener("click", function (): void {
      currentEmoji = selectedEmoji[f].innerHTML;
      emojiButton.innerHTML = currentEmoji;
      togglePopup();
    });
  }
  displayTasks();
  artyom();
});

function displayTasks(): void {
  taskElement.innerHTML = ""; //clear
  for (let i: number = 0; i < allTasks.length; i++) {
    let todo: HTMLElement = document.createElement("div");
    todo.classList.add("taskElement");
    todo.innerHTML =
      "<span class='catEmoji'>" +
      allTasks[i].emoji +
      "</span>" +
      allTasks[i].content +
      "<span class='delete fas fa-trash'></span><span class='checkbox " +
      allTasks[i].status +
      "'><i class='fas fa-check'></i></span>";
    todo
      .querySelector(".checkbox")
      .addEventListener("click", function (): void {
        toggleStatus(i);
      });
    todo.querySelector(".delete").addEventListener("click", function (): void {
      deleteTask(i);
    });
    taskElement.appendChild(todo);
  }
  calculateStats();
}

//Statistiken oben
function calculateStats(): void {
  let todoCount: number = 0;
  for (var i: number = 0; i < allTasks.length; ++i) {
      if (allTasks[i].status == false) {
          todoCount++;
      }
  }
  stats.innerHTML = "<b>" + todoCount + "</b> To Do / <b>" + +(allTasks.length - todoCount) + "</b> Done / <b>" + allTasks.length + "</b> Total";
  if (allTasks.length > 20) {
    alert(
      "Da du hier nicht speichern kannst, musst du alles noch heute erledigen!"
    );
  }
}

//Taks hinzufügen
function addTask(): void {
  if (inputField.value != "") {
    let newContent: String = inputField.value;
    const newTask: Task = {
      content: newContent,
      status: false,
      color: "white",
      emoji: currentEmoji
    }; //default: unerledigt und ohne Farbe
    allTasks.unshift(newTask);
    inputField.value = "";
    //console.log(allTasks);
    displayTasks();
  }
}

//entweder Task checken oder unchecken
function toggleStatus(i: number): void {
  allTasks[i].status = !allTasks[i].status;
  displayTasks();
}

//Task aus Array löschen
function deleteTask(i: number): void {
  allTasks.splice(i, 1);
  displayTasks();
}

function togglePopup(): void {
  popup.classList.toggle("show");
  //popup.style.display = "block";
}

//Artyom



function artyom(): void {
  const artyom: any = new Artyom();

  artyom.addCommands({
    indexes: ["erstelle Aufgabe *", "erstelle neue Aufgabe *", "neue Aufgabe *", "create Task *", "create Todo *", "create new Task *", "create new todo *"],
    smart: true,
    action: function (i: number, wildcard: string): void {
      const newVoiceTask: Task = {
        content: wildcard,
        status: false,
        color: "white",
        emoji: currentEmoji
      }; //default: unerledigt und ohne Farbe
      allTasks.unshift(newVoiceTask);
      displayTasks();
    }
  });

  function startContinuousArtyom(): void {
    artyom.fatality();

    setTimeout(function (): void {
      artyom
        .initialize({
          lang: "de-DE",
          continuous: true,
          listen: true,
          interimResults: true,
          debug: false
        })
        .then(function (): void {
          console.log("To create a new Task say: 'erstelle Aufgabe *', 'erstelle neue Aufgabe *', 'neue Aufgabe *', 'create Task *', 'create Todo *', 'create new Task *', 'create new todo *'");
        });
    },         250);
  }
  startContinuousArtyom();
}
