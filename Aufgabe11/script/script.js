var allTasks = [
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
var inputField;
var plusButton;
var taskElement;
var emojiButton;
var popup;
var stats;
var closeEmoji;
var currentEmoji = "😺";
window.addEventListener("load", function () {
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
    document.addEventListener("keydown", function (pressed) {
        if (pressed.keyCode === 13) {
            addTask();
            inputField.focus();
        }
    });
    var selectedEmoji = document.getElementsByClassName("selectEmoji");
    var _loop_1 = function (f) {
        selectedEmoji[f].addEventListener("click", function () {
            currentEmoji = selectedEmoji[f].innerHTML;
            emojiButton.innerHTML = currentEmoji;
            togglePopup();
        });
    };
    for (var f = 0; f < selectedEmoji.length; f++) {
        _loop_1(f);
    }
    displayTasks();
    artyom();
});
function displayTasks() {
    taskElement.innerHTML = ""; //clear
    var _loop_2 = function (i_1) {
        var todo = document.createElement("div");
        todo.classList.add("taskElement");
        todo.innerHTML =
            "<span class='catEmoji'>" +
                allTasks[i_1].emoji +
                "</span>" +
                allTasks[i_1].content +
                "<span class='delete fas fa-trash'></span><span class='checkbox " +
                allTasks[i_1].status +
                "'><i class='fas fa-check'></i></span>";
        todo
            .querySelector(".checkbox")
            .addEventListener("click", function () {
            toggleStatus(i_1);
        });
        todo.querySelector(".delete").addEventListener("click", function () {
            deleteTask(i_1);
        });
        taskElement.appendChild(todo);
    };
    for (var i_1 = 0; i_1 < allTasks.length; i_1++) {
        _loop_2(i_1);
    }
    calculateStats();
}
//Statistiken oben
function calculateStats() {
    var todoCount = 0;
    for (var i = 0; i < allTasks.length; ++i) {
        if (allTasks[i].status == false) {
            todoCount++;
        }
    }
    stats.innerHTML = "<b>" + todoCount + "</b> To Do / <b>" + +(allTasks.length - todoCount) + "</b> Done / <b>" + allTasks.length + "</b> Total";
    if (allTasks.length > 20) {
        alert("Da du hier nicht speichern kannst, musst du alles noch heute erledigen!");
    }
}
//Taks hinzufügen
function addTask() {
    if (inputField.value != "") {
        var newContent = inputField.value;
        var newTask = {
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
function toggleStatus(i) {
    allTasks[i].status = !allTasks[i].status;
    displayTasks();
}
//Task aus Array löschen
function deleteTask(i) {
    allTasks.splice(i, 1);
    displayTasks();
}
function togglePopup() {
    popup.classList.toggle("show");
    //popup.style.display = "block";
}
//Artyom
function artyom() {
    var artyom = new Artyom();
    artyom.addCommands({
        indexes: ["erstelle Aufgabe *", "erstelle neue Aufgabe *", "neue Aufgabe *", "create Task *", "create Todo *", "create new Task *", "create new todo *"],
        smart: true,
        action: function (i, wildcard) {
            var newVoiceTask = {
                content: wildcard,
                status: false,
                color: "white",
                emoji: currentEmoji
            }; //default: unerledigt und ohne Farbe
            allTasks.unshift(newVoiceTask);
            displayTasks();
        }
    });
    function startContinuousArtyom() {
        artyom.fatality();
        setTimeout(function () {
            artyom
                .initialize({
                lang: "de-DE",
                continuous: true,
                listen: true,
                interimResults: true,
                debug: false
            })
                .then(function () {
                console.log("To create a new Task say: 'erstelle Aufgabe *', 'erstelle neue Aufgabe *', 'neue Aufgabe *', 'create Task *', 'create Todo *', 'create new Task *', 'create new todo *'");
            });
        }, 250);
    }
    startContinuousArtyom();
}
//# sourceMappingURL=script.js.map