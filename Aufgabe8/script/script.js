var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//Notendeklaration
var notes = [
    ["A2", "gChuck"],
    ["A#2", "a1"],
    ["B2", "a2"],
    ["C", "gChuck"],
    ["C2", "a3"],
    ["C#", "c1"],
    ["D", "c2"],
    ["D#", "c3"],
    ["E", "c4"],
    ["F", "e1"],
    ["F#", "e2"],
    ["G", "e3"],
    ["G#", "e4"],
];
var sounds = {
    Ukulele: {},
};
//Namen für sounds anpassen (Dateien umbenennen wäre einfacher gewesen)
notes.forEach(function (note) {
    var noteName = note[0];
    var audioName = noteName.replace("#", "sharp").toLowerCase();
    if (!noteName.includes("2")) {
        audioName += "1";
    }
    var sound = {
        svgElement: note[1],
        audio: new Audio("./sounds/" + audioName + ".mp3"),
    };
    sounds["Ukulele"][noteName] = sound;
});
var loopInterval;
var recordingStartTimestamp;
var recording = [];
//Grundlage für Aufnahme
function prepareRecording() {
    if (recording.length == 0) {
        return;
    }
    else if (recording.length == 1) {
        recording[0].timestamp = recording[0].timestamp - recordingStartTimestamp;
        return;
    }
    for (var i = recording.length - 1; i >= 1; i--) {
        var prevTs = recording[i - 1].timestamp;
        var ts = recording[i].timestamp;
        recording[i].timestamp = ts - prevTs;
    }
    recording[0].timestamp = recording[0].timestamp - recordingStartTimestamp;
}
//Sobald die Seite geladen wurde checken ob entweder ein Tile geklickt wurde oder ein Tastendruck stattgefunden hat
window.addEventListener("load", function () {
    tile();
    keypress();
    setupLoop();
    setupRecording();
    setupDeleteRecording();
});
//Checken, welches Tile geklickt wird
function tile() {
    var soundTile = document.getElementsByClassName("key");
    var _loop_1 = function (f) {
        soundTile[f].addEventListener("click", function () {
            var soundName = soundTile[f].innerHTML;
            playSound(soundName);
            ukuleleAnimation(soundName);
        });
    };
    for (var f = 0; f < soundTile.length; f++) {
        _loop_1(f);
    }
}
//Checken, ob Taste gedrückt wurde
function keypress() {
    document.addEventListener("keydown", function (pressed) {
        //suboptimal, Y und Z bei deutschem Layout
        var currentKey = "k" + pressed.keyCode;
        var soundTile = document.getElementById(currentKey);
        var soundName = soundTile.innerHTML;
        playSound(soundName);
        ukuleleAnimation(soundName);
        keyAnimation(currentKey);
    });
}
//Checken, ob loop abgespielt werden soll
function setupLoop() {
    document
        .querySelector("#playButton")
        .addEventListener("click", function () {
        var faIcon = document.querySelector("#playButton");
        if (!faIcon.firstElementChild.classList.contains("fa-stop")) {
            faIcon.firstElementChild.classList.add("fa-stop");
            faIcon.firstElementChild.classList.remove("fa-play");
            var totalLength = recording
                .map(function (note) { return note.timestamp; })
                .reduce(function (acc, cur) { return acc + cur; }); //Zähler + jetzig
            playLoop();
            loopInterval = setInterval(playLoop, totalLength);
        }
        else {
            faIcon.firstElementChild.classList.remove("fa-stop");
            faIcon.firstElementChild.classList.add("fa-play");
            clearInterval(loopInterval);
        }
    });
}
//bei Click fängt recordButton an zu blinken
function setupRecording() {
    document
        .querySelector("#recordButton")
        .addEventListener("click", function () {
        var recordIcon = document.querySelector("#recordButton");
        if (isRecording()) {
            recordIcon.firstElementChild.classList.remove("recordingActive");
            prepareRecording();
        }
        else {
            recordIcon.firstElementChild.classList.add("recordingActive");
            recordingStartTimestamp = Date.now();
        }
    });
}
//Wenn Delete gedrückt wird
function setupDeleteRecording() {
    document
        .querySelector("#deleteButton")
        .addEventListener("click", function () {
        var recordIcon = document.querySelector("#recordButton");
        if (isRecording()) {
            recordIcon.firstElementChild.classList.remove("recordingActive");
        }
        recording.splice(0, recording.length); // clear array
        clearInterval(loopInterval);
    });
}
//Sound abspielen
function playSound(tone) {
    var playedSound = sounds["Ukulele"][tone].audio;
    playedSound.currentTime = 0; //Ton wird zurückgesetzt, um schnell hintereinader abgespielt werden zu können
    playedSound.play();
    if (isRecording()) {
        var note = { tone: tone, timestamp: Date.now() };
        recording.push(note);
    }
}
//SVG-Animation ausführen
function ukuleleAnimation(animateThis) {
    var svgElement = sounds["Ukulele"][animateThis].svgElement;
    document.getElementById(svgElement).classList.add("activeNote");
    setTimeout(function () {
        document.getElementById(svgElement).classList.remove("activeNote");
    }, 500); // noch suboptimal
}
//Tastatur-Animation
function keyAnimation(animateKey) {
    document.getElementById(animateKey).classList.add("pressedKey");
    setTimeout(function () {
        document.getElementById(animateKey).classList.remove("pressedKey");
    }, 500); //noch suboptimal
}
//Loops abspielen
function playLoop() {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_2, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_2 = function (i) {
                        var note;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    note = recording[i];
                                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, note.timestamp); })];
                                case 1:
                                    _a.sent();
                                    playSound(note.tone);
                                    ukuleleAnimation(note.tone);
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < recording.length)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_2(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//Checken, ob weiter aufgenommen werden soll
function isRecording() {
    return document
        .querySelector("#recordButton")
        .firstElementChild.classList.contains("recordingActive");
}
//# sourceMappingURL=script.js.map