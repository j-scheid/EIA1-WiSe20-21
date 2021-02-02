var inputFieldName;
var inputFieldEmail;
var inputFieldPhone;
inputFieldName = document.querySelector("#inputName");
inputFieldEmail = document.querySelector("#inputEmail");
inputFieldPhone = document.querySelector("#inputPhone");
function dynamicList(element, items, builder) {
    var buildList = function () {
        element.innerHTML = "";
        items.forEach(function (item) {
            var content = builder(item);
            element.innerHTML += "<li>" + content + "</li>";
        });
    };
    buildList(); //erstes Mal ausführen, um bestehende anzuzeigen
    return buildList;
}
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
var htmlList = document.getElementById("outputList");
var buildContacts = dynamicList(htmlList, contactsList, function (contact) {
    return contact.name + " | " + contact.email + " | " + contact.phone;
});
var addButton = document.getElementById("addToContacts");
addButton.addEventListener("click", function () {
    contactsList.push({
        name: inputFieldName.value,
        email: inputFieldEmail.value,
        phone: inputFieldPhone.value
    });
    buildContacts();
});
//# sourceMappingURL=presentation.js.map