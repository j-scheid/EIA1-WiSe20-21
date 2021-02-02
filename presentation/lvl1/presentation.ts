let inputFieldName: HTMLInputElement;
let inputFieldEmail: HTMLFormElement;
let inputFieldPhone: HTMLFormElement;
let outputList: HTMLElement;

window.addEventListener("load", function (): void {
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
  phone: string;
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
    email: inputFieldEmail.value,
    phone: inputFieldPhone.value
  };
  contactsList.push(newContact);
  createContactsList();
}

function createContactsList(): void {
  for (let index: number = 0; index < contactsList.length; index++) {
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
