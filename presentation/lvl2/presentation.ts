//vorher:
let inputFieldName: HTMLInputElement;
inputFieldName = document.querySelector("#inputName");
//Variablen können direkt deklariert werden
let inputFieldEmail: HTMLFormElement = document.querySelector("#inputEmail");
let inputFieldPhone: HTMLFormElement = document.querySelector("#inputPhone");


function dynamicList<T>(element: HTMLElement, items: T[], builder: { (item: T): String}): { (): void } {
  const buildList: { (): void } = (): void => {
    element.innerHTML = "";
    items.forEach((item) => {
      const content: String = builder(item);
      element.innerHTML += "<li>" + content + "</li>";
    });
  };
  buildList(); 

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
