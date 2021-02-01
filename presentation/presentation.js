//Variablen initialisieren ("erstellen")
var inputFieldName; //warum nicht HTMLInputElement?
var inputFieldEmail;
var inputFieldPhone; //Unterschied HTMLFormElement zu HTMLElement
var outputList; //Variablen als Thema
window.addEventListener("load", function () {
    //Variablen deklarieren ("Zuweisen") Position relevant!!!! Müssen oben im load listener stehen
    inputFieldName = document.querySelector("#inputName");
    inputFieldEmail = document.querySelector("#inputEmail");
    inputFieldPhone = document.querySelector("#inputPhone");
    outputList = document.querySelector("#outputList");
    document
        .querySelector("#addToContacts")
        .addEventListener("click", function () {
        addToContacts();
    });
    createContactsList();
});
var contactsList = [
    {
        name: "Martin Lotz",
        email: "martin@lotz.io",
        phone: "+49 (0) 17613138882"
    },
    {
        name: "Mathias Müller",
        email: "mathias@mueller.com",
        phone: "+49 (0) 160935798735"
    }
];
function addToContacts() {
    var newContact = {
        name: inputFieldName.value,
        email: inputFieldEmail.value,
        phone: inputFieldPhone.value
    };
    contactsList.push(newContact);
    createContactsList(); //vorherige Funktion existiert nicht
}
function createContactsList() {
    outputList.innerHTML = ""; //clear (neu hinzugefügt, damit die Liste nicht jedes mal untereinander dargestellt wird, am besten mal raus nehmen und selber sehen)
    for (var index = 0; index < contactsList.length; index++) {
        //let eintrag: HTMLElement = document.createElement("div"); --> Optional könnte man jedes Listenelement in ein div packen für leichteres Styling (Überleitung zu CSS?)
        //eintrag.classList.add("eintragElement");
        outputList.innerHTML +=
            "<li>" +
                contactsList[index].name +
                " | " +
                contactsList[index].email +
                " | " +
                contactsList[index].phone +
                "</li>";
    }
}
//# sourceMappingURL=praesi.js.map