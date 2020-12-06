//Audiodateien
var sounds: {
  //Interface
  [name: string]: {
    [name: string]: {
      [name: string]: HTMLAudioElement | string; //kann entweder typ Audio haben oder Zeichenkette
    };
  };
} = {
  Ukulele: {
    "A2": {
      audio: new Audio("./sounds/a2.mp3"), //wird abgespielt
      svgElement: "gChuck", //zu animierendes Element, open A
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
      svgElement: "gChuck", //open C
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
      svgElement: "c4", //open E
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
var loops: {
  //Interface
  [name: string]: {
    [name: string]: {
      [name: string]: string;
    };
  };
} = {
  loop1: {
    0: {
      note: "G",
      delay: "0", //in ms
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
  let soundTile = document.getElementsByClassName("key");
  for (let f = 0; f < soundTile.length; f++) {
    soundTile[f].addEventListener("click", function () {
      let soundName = soundTile[f].innerHTML;
      playSound(soundName);
      ukuleleAnimation(soundName);
    });
  }
}
//Checken, ob Taste gedrückt wurde
function keypress() {
  document.addEventListener("keydown", function (pressed) { //suboptimal, Y und Z bei deutschem Layout
    let currentKey = "k" + pressed.keyCode;
    let soundTile = document.getElementById(currentKey);
    let soundName = soundTile.innerHTML;
    playSound(soundName);
    ukuleleAnimation(soundName);
    keyAnimation(currentKey);
  });
}
//Checken, ob loop abgespielt werden soll
function checkLoop() {
  document.querySelector("#playButton").addEventListener("click", function () {
    setInterval(function() {
      playLoop("loop1");
     }, 5000);  //mit einer Schleife nächste Woche besser zu lösen
     document.querySelector("#playButton").classList.add("blocked"); //playButton darf nur ein mal gedrückt werden
  });
}
//Sound abspielen
function playSound(tone) {
  let playedSound = sounds["Ukulele"][tone].audio;
  playedSound.currentTime = 0; //Ton wird zurückgesetzt, um schnell hintereinader abgespielt werden zu können
  playedSound.play();
}

//SVG-Animation ausführen
function ukuleleAnimation(animateThis) {
  let svgElement = sounds["Ukulele"][animateThis].svgElement;
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

async function playLoop(loopNumber) {
  let loopToPlay = loops[loopNumber]; //richtigen Loop auswählen
  for (let i = 0; i < Object.keys(loopToPlay).length; i++) {
    let loopDelay = loops["loop1"][i].delay;
    await new Promise((r) => setTimeout(r, Number(loopDelay)));   
    let soundToPlay = loops["loop1"][i].note;
    playSound(soundToPlay);
    ukuleleAnimation(soundToPlay);
  }
}
