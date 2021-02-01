//Variablen initialisieren ("erstellen")
let inputFieldName: HTMLInputElement; //warum nicht HTMLInputElement?
let inputFieldEmail: HTMLFormElement;
let inputFieldPhone: HTMLFormElement; //Unterschied HTMLFormElement zu HTMLElement
let outputList: HTMLElement; //Variablen als Thema

window.addEventListener("load", function (): void {
  //Variablen deklarieren ("Zuweisen") Position relevant!!!! Müssen oben im load listener stehen
  inputFieldName = document.querySelector("#inputName");
  inputFieldEmail = document.querySelector("#inputEmail");
  inputFieldPhone = document.querySelector("#inputPhone");
  outputList = document.querySelector("#outputList");

  document
    .querySelector("#addToContacts")
    .addEventListener("click", function (): void {
      addToContacts();
    });
  createContactsList();
});

interface Contact {
  name: string;
  email: string;
  phone: string; //; statt , | string statt number
}
var contactsList: Contact[] = [
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

function addToContacts(): void {
  let newContact: Contact = {
    name: inputFieldName.value,
    email: inputFieldEmail.value, //kein Bindestrich
    phone: inputFieldPhone.value
  };
  contactsList.push(newContact);
  createContactsList(); //vorherige Funktion existiert nicht
}

function createContactsList(): void {
  outputList.innerHTML = ""; //clear (neu hinzugefügt, damit die Liste nicht jedes mal untereinander dargestellt wird, am besten mal raus nehmen und selber sehen)
  for (let index: number = 0; index < contactsList.length; index++) {
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
