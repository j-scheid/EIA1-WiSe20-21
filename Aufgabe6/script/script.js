//Datengrundlage
var continent = {
    0: {
        name: "Afrika",
        eng: "Africa",
        e08: 1028,
        e18: 1235.5,
    },
    1: {
        name: "Südamerika",
        eng: "South America",
        e08: 1132.6,
        e18: 1261.5,
    },
    2: {
        name: "Europa",
        eng: "Europe",
        e08: 4965.7,
        e18: 4209.3,
    },
    3: {
        name: "Nordamerika",
        eng: "North America",
        e08: 6600.4,
        e18: 6035.6,
    },
    4: {
        name: "Asien",
        eng: "Asia",
        e08: 12954.7,
        e18: 16274.1,
    },
    5: {
        name: "Australien",
        eng: "Australia",
        e08: 1993,
        e18: 2100.5,
    }
};
//Berechnungen Total
var total18 = continent[0].e18 + continent[1].e18 + continent[2].e18 + continent[3].e18 + continent[4].e18 + continent[5].e18;
console.log("Gesamtemissionen 2018: " + total18);
var total08 = continent[0].e08 + continent[1].e08 + continent[2].e08 + continent[3].e08 + continent[4].e08 + continent[5].e08;
console.log("Gesamtemissionen 2008: " + total08);
console.log("Für die gesamte Erde hat sich 2018 im Vergleich zu 2008 die Emission um " + +((total18 / total08 * 100 - 100).toFixed(2)) + "% verändert");
console.log("2018 im Vergleich zu 2008 sind das " + +((total18 - total08).toFixed(2)) + "kg CO2");
//Ausgabe in Konsole (Aufgabe 5)
for (var i = 0; i < Object.keys(continent).length; i++) {
    console.log("////");
    console.log("Die Emission von " + continent[i].name + " ist: " + continent[i].e18 + "kg CO2");
    console.log("Relativ zur Gesamtemission der Welt verursacht " + continent[i].name + " damit " + +((continent[i].e18 / total18 * 100).toFixed(2)) + "%"); //mit +() umschliessen, sonst string
    console.log("Für " + continent[i].name + " hat sich 2018 im Vergleich zu 2008 die Emission um " + +((continent[i].e18 / continent[i].e08 * 100 - 100).toFixed(2)) + "% verändert");
    console.log("2018 im Vergleich zu 2008 sind das " + +((continent[i].e18 - continent[i].e08).toFixed(2)) + "kg CO2");
}
//Checken, welches Bild geklickt wird
function click() {
    var img = document.getElementsByTagName("img");
    var _loop_1 = function (f) {
        img[f].addEventListener("click", function () {
            //Berechnung
            var relative = (continent[f].e18 / total18 * 100).toFixed(2);
            var growthpercent = (continent[f].e18 / continent[f].e08 * 100 - 100).toFixed(2);
            var growthabsolute = (continent[f].e18 - continent[f].e08).toFixed(2);
            //DOM und CSS Manipulation
            document.getElementById("e18").innerHTML = continent[f].e18;
            document.getElementById("heading").innerHTML = continent[f].eng;
            document.getElementById("titleRegion").innerHTML = continent[f].eng;
            document.getElementById("relative").innerHTML = relative;
            document.getElementById("growthpercent").innerHTML = growthpercent;
            document.getElementById("growthabsolute").innerHTML = growthabsolute;
            document.documentElement.style.setProperty("--percent", relative);
        });
    };
    for (var f = 0; f < img.length; f++) {
        _loop_1(f);
    }
}
//Funktionen erst ausführen, sobald die Seite geladen wurde
window.addEventListener("load", function () {
    click();
});
//# sourceMappingURL=script.js.map