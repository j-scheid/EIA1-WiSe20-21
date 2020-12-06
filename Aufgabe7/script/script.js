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
//Audiodateien
var sounds = {
    Ukulele: {
        "A2": {
            audio: new Audio("./sounds/a2.mp3"),
            svgElement: "gChuck",
        },
        "A#2": {
            audio: new Audio("./sounds/asharp2.mp3"),
            svgElement: "a1",
        },
        "B2": {
            audio: new Audio("./sounds/b2.mp3"),
            svgElement: "a2",
        },
        "C": {
            audio: new Audio("./sounds/c1.mp3"),
            svgElement: "gChuck",
        },
        "C2": {
            audio: new Audio("./sounds/c2.mp3"),
            svgElement: "a3",
        },
        "C#": {
            audio: new Audio("./sounds/csharp1.mp3"),
            svgElement: "c1",
        },
        "D": {
            audio: new Audio("./sounds/d1.mp3"),
            svgElement: "c2",
        },
        "D#": {
            audio: new Audio("./sounds/dsharp1.mp3"),
            svgElement: "c3",
        },
        "E": {
            audio: new Audio("./sounds/e1.mp3"),
            svgElement: "c4",
        },
        "F": {
            audio: new Audio("./sounds/f1.mp3"),
            svgElement: "e1",
        },
        "F#": {
            audio: new Audio("./sounds/fsharp1.mp3"),
            svgElement: "e2",
        },
        "G": {
            audio: new Audio("./sounds/g1.mp3"),
            svgElement: "e3",
        },
        "G#": {
            audio: new Audio("./sounds/gsharp1.mp3"),
            svgElement: "e4",
        },
    },
};
//Loops
var loops = {
    loop1: {
        0: {
            note: "G",
            delay: "0",
        },
        1: {
            note: "G",
            delay: "975",
        },
        2: {
            note: "A2",
            delay: "487",
        },
        3: {
            note: "G",
            delay: "487",
        },
        4: {
            note: "F",
            delay: "487",
        },
        5: {
            note: "D",
            delay: "487",
        },
        6: {
            note: "C",
            delay: "975",
        },
    },
};
//Sobald die Seite geladen wurde checken ob entweder ein Tile geklickt wurde oder ein Tastendruck stattgefunden hat
window.addEventListener("load", function () {
    tile();
    keypress();
    checkLoop();
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
        var currentKey = "k" + pressed.keyCode;
        var soundTile = document.getElementById(currentKey);
        var soundName = soundTile.innerHTML;
        playSound(soundName);
        ukuleleAnimation(soundName);
        keyAnimation(currentKey);
    });
}
//Checken, ob loop abgespielt werden soll
function checkLoop() {
    document.querySelector("#playButton").addEventListener("click", function () {
        setInterval(function () {
            playLoop("loop1");
        }, 5000); //mit einer Schleife nächste Woche besser zu lösen
        document.querySelector("#playButton").classList.add("blocked"); //playButton darf nur ein mal gedrückt werden
    });
}
//Sound abspielen
function playSound(tone) {
    var playedSound = sounds["Ukulele"][tone].audio;
    playedSound.currentTime = 0; //Ton wird zurückgesetzt, um schnell hintereinader abgespielt werden zu können
    playedSound.play();
}
//SVG-Animation ausführen
function ukuleleAnimation(animateThis) {
    var svgElement = sounds["Ukulele"][animateThis].svgElement;
    document.getElementById(svgElement).classList.add("activeNote");
    setTimeout(function () {
        document.getElementById(svgElement).classList.remove("activeNote");
    }, 500); //noch suboptimal
}
//Tastatur-Animation
function keyAnimation(animateKey) {
    document.getElementById(animateKey).classList.add("pressedKey");
    setTimeout(function () {
        document.getElementById(animateKey).classList.remove("pressedKey");
    }, 500); //noch suboptimal
}
function playLoop(loopNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var loopToPlay, _loop_2, i_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loopToPlay = loops[loopNumber];
                    _loop_2 = function (i_1) {
                        var loopDelay, soundToPlay;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    loopDelay = loops["loop1"][i_1].delay;
                                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, Number(loopDelay)); })];
                                case 1:
                                    _a.sent();
                                    soundToPlay = loops["loop1"][i_1].note;
                                    playSound(soundToPlay);
                                    ukuleleAnimation(soundToPlay);
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i_1 = 0;
                    _a.label = 1;
                case 1:
                    if (!(i_1 < Object.keys(loopToPlay).length)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_2(i_1)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i_1++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=script.js.map