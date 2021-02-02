var inputFieldName;
var inputFieldEmail;
var inputFieldPhone;
var emojiButton;
var popup;
var stats;
var closeEmoji;
var currentEmoji = "😺";
inputFieldName = document.querySelector("#inputName");
inputFieldEmail = document.querySelector("#inputEmail");
inputFieldPhone = document.querySelector("#inputPhone");
emojiButton = document.querySelector(".catButton");
popup = document.querySelector("#emojiMenu");
closeEmoji = document.querySelector(".closeEmoji");
emojiButton.addEventListener("click", togglePopup);
closeEmoji.addEventListener("click", togglePopup);
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
function dynamicList(element, items, builder) {
    var buildList = function () {
        element.innerHTML = "";
        items.forEach(function (item) {
            var content = builder(item);
            element.innerHTML += "<li>" + content + "<span class='delete fas fa-trash'></span><span class='edit fas fa-edit'></span></li>";
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
function togglePopup() {
    popup.classList.toggle("show");
}
//# sourceMappingURL=presentation.js.map