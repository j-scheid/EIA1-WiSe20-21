let inputFieldName: HTMLInputElement;
let inputFieldEmail: HTMLFormElement;
let inputFieldPhone: HTMLFormElement;
let emojiButton: HTMLElement;
let popup: HTMLElement;
let stats: HTMLElement;
let closeEmoji: HTMLElement;

let currentEmoji: string = "😺";

inputFieldName = document.querySelector("#inputName");
inputFieldEmail = document.querySelector("#inputEmail");
inputFieldPhone = document.querySelector("#inputPhone");
emojiButton = document.querySelector(".catButton");
popup = document.querySelector("#emojiMenu");
closeEmoji = document.querySelector(".closeEmoji");

emojiButton.addEventListener("click", togglePopup);
closeEmoji.addEventListener("click", togglePopup);

let selectedEmoji: HTMLCollection = document.getElementsByClassName("selectEmoji");

for (let f: number = 0; f < selectedEmoji.length; f++) {
  selectedEmoji[f].addEventListener("click", function (): void {
    currentEmoji = selectedEmoji[f].innerHTML;
    emojiButton.innerHTML = currentEmoji;
    togglePopup();
  });
}

function dynamicList<T>(element: HTMLElement, items: T[], builder: { (item: T): String}): { (): void } { //return, builder kein string
  const buildList: { (): void } = (): void => {
    element.innerHTML = "";
    items.forEach((item) => {
      const content: String = builder(item);
      element.innerHTML += "<li>" + content + "<span class='delete fas fa-trash'></span></li>";
    });
  };
  buildList(); //erstes Mal ausführen, um bestehende anzuzeigen

  return buildList;
}

interface Contact {
  name: string;
  email: string;
  phone: string;
}

let contactsList: Contact[] = [
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

const htmlList: HTMLElement = document.getElementById("outputList");

const buildContacts: { (): void } = dynamicList<Contact>(htmlList, contactsList, (contact) => {
  return contact.name + " | " + contact.email + " | " + contact.phone;
});

const addButton: HTMLElement = document.getElementById("addToContacts");
addButton.addEventListener("click", () => {
  contactsList.push({
    name: inputFieldName.value,
    email: inputFieldEmail.value,
    phone: inputFieldPhone.value
  });
  buildContacts();
});

function togglePopup(): void {
  popup.classList.toggle("show");
}