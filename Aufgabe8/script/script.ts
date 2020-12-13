//Notendeklaration
const notes = [
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

interface Instrument {
	[name: string]: Sound;
}

interface Sound {
	audio: HTMLAudioElement;
	svgElement: string;
}

const sounds: {
	[name: string]: Instrument;
} = {
	Ukulele: {},
};

//Namen für sounds anpassen (Dateien umbenennen wäre einfacher gewesen)
notes.forEach((note) => {
	const noteName: string = note[0];

	let audioName: string = noteName.replace("#", "sharp").toLowerCase();
	if (!noteName.includes("2")) {
		audioName += "1";
	}

	const sound: Sound = {
		svgElement: note[1],
		audio: new Audio("./sounds/" + audioName + ".mp3"),
	};

	sounds["Ukulele"][noteName] = sound;
});

interface RecordingNote {
	tone: string;
	timestamp: number;
}

let loopInterval: number;
let recordingStartTimestamp: number;
const recording: RecordingNote[] = [];

//Grundlage für Aufnahme
function prepareRecording() {
	if (recording.length == 0) {
		return;
	} else if (recording.length == 1) {
		recording[0].timestamp = recording[0].timestamp - recordingStartTimestamp;
		return;
	}

	for (let i: number = recording.length - 1; i >= 1; i--) {
		const prevTs: number = recording[i - 1].timestamp;
		const ts: number = recording[i].timestamp;

		recording[i].timestamp = ts - prevTs;
	}
	recording[0].timestamp = recording[0].timestamp - recordingStartTimestamp;
}

//Sobald die Seite geladen wurde checken ob entweder ein Tile geklickt wurde oder ein Tastendruck stattgefunden hat
window.addEventListener("load", function (): void {
	tile();
	keypress();
	setupLoop();
	setupRecording();
	setupDeleteRecording();
});
//Checken, welches Tile geklickt wird
function tile(): void {
	const soundTile = document.getElementsByClassName("key");
	for (let f: number = 0; f < soundTile.length; f++) {
		soundTile[f].addEventListener("click", function (): void {
			const soundName: string = soundTile[f].innerHTML;
			playSound(soundName);
			ukuleleAnimation(soundName);
		});
	}
}
//Checken, ob Taste gedrückt wurde
function keypress(): void {
	document.addEventListener("keydown", function (pressed): void {
		//suboptimal, Y und Z bei deutschem Layout
		const currentKey: string = "k" + pressed.keyCode;
		const soundTile: HTMLElement = document.getElementById(currentKey);
		const soundName: string = soundTile.innerHTML;
		playSound(soundName);
		ukuleleAnimation(soundName);
		keyAnimation(currentKey);
	});
}
//Checken, ob loop abgespielt werden soll
function setupLoop(): void {
	document
		.querySelector("#playButton")
		.addEventListener("click", function (): void {
			const faIcon: HTMLElement = document.querySelector("#playButton");

			if (!faIcon.firstElementChild.classList.contains("fa-stop")) {
				faIcon.firstElementChild.classList.add("fa-stop");
				faIcon.firstElementChild.classList.remove("fa-play");
						
				const totalLength = recording
					.map((note) => note.timestamp)
					.reduce((acc, cur) => acc + cur); //Zähler + jetzig
					playLoop();		
				loopInterval = setInterval(playLoop, totalLength);
			} else {
				faIcon.firstElementChild.classList.remove("fa-stop");
				faIcon.firstElementChild.classList.add("fa-play");

				clearInterval(loopInterval);
			}
		});
}
//bei Click fängt recordButton an zu blinken
function setupRecording(): void {
	document
		.querySelector("#recordButton")
		.addEventListener("click", function (): void {
			const recordIcon: HTMLElement = document.querySelector("#recordButton");
			if (isRecording()) {
				recordIcon.firstElementChild.classList.remove("recordingActive");
				prepareRecording();
			} else {
				recordIcon.firstElementChild.classList.add("recordingActive");
				recordingStartTimestamp = Date.now();
			}
		});
}
//Wenn Delete gedrückt wird
function setupDeleteRecording(): void {
	document
		.querySelector("#deleteButton")
		.addEventListener("click", function (): void {
			const recordIcon: HTMLElement = document.querySelector("#recordButton");
			if (isRecording()) {
				recordIcon.firstElementChild.classList.remove("recordingActive");
			}
			recording.splice(0, recording.length); // clear array
			clearInterval(loopInterval);
		});
}
//Sound abspielen
function playSound(tone: string): void {
	const playedSound: HTMLAudioElement = sounds["Ukulele"][tone].audio;
	playedSound.currentTime = 0; //Ton wird zurückgesetzt, um schnell hintereinader abgespielt werden zu können
	playedSound.play();
	if (isRecording()) {
		const note: RecordingNote = { tone, timestamp: Date.now() };
		recording.push(note);
	}
}

//SVG-Animation ausführen
function ukuleleAnimation(animateThis: string): void {
	const svgElement: string = sounds["Ukulele"][animateThis].svgElement;
	document.getElementById(svgElement).classList.add("activeNote");
	setTimeout(() => {
		document.getElementById(svgElement).classList.remove("activeNote");
	}, 500); // noch suboptimal
}

//Tastatur-Animation
function keyAnimation(animateKey: string): void {
	document.getElementById(animateKey).classList.add("pressedKey");
	setTimeout(() => {
		document.getElementById(animateKey).classList.remove("pressedKey");
	}, 500); //noch suboptimal
}

//Loops abspielen
async function playLoop(): Promise<void> {
	//recording.forEach(async (note) => {
	for (let i: number = 0; i < recording.length; i++) {
		const note: RecordingNote = recording[i];

		await new Promise((r) => setTimeout(r, note.timestamp));
		playSound(note.tone);
		ukuleleAnimation(note.tone);
	}
}

//Checken, ob weiter aufgenommen werden soll
function isRecording(): Boolean {
	return document
		.querySelector("#recordButton")
		.firstElementChild.classList.contains("recordingActive");
}
