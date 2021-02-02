var inputFieldName;
var inputFieldEmail;
var inputFieldPhone;
var outputList;
window.addEventListener("load", function () {
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
    createContactsList();
}
function createContactsList() {
    for (var index = 0; index < contactsList.length; index++) {
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
//# sourceMappingURL=presentation.js.map