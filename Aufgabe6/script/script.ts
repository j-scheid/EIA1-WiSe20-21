//Datengrundlage
var continents = {
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
var total18 = continents[0].e18 + continents[1].e18 + continents[2].e18 + continents[3].e18 + continents[4].e18 + continents[5].e18;
console.log("Gesamtemissionen 2018: " + total18);
var total08 = continents[0].e08 + continents[1].e08 + continents[2].e08 + continents[3].e08 + continents[4].e08 + continents[5].e08;
console.log("Gesamtemissionen 2008: " + total08);
console.log("Für die gesamte Erde hat sich 2018 im Vergleich zu 2008 die Emission um " + +((total18 / total08 * 100 - 100).toFixed(2)) + "% verändert");
console.log("2018 im Vergleich zu 2008 sind das " + +((total18 - total08).toFixed(2)) + "kg CO2");

//Ausgabe in Konsole (Aufgabe 5)
for (var i = 0; i < Object.keys(continents).length; i++) {
    console.log("////")
    console.log("Die Emission von " + continents[i].name + " ist: " + continents[i].e18 + "kg CO2");
    console.log("Relativ zur Gesamtemission der Welt verursacht " + continents[i].name + " damit " + +((continents[i].e18 / total18 * 100).toFixed(2)) + "%"); //mit +() umschliessen, sonst string
    console.log("Für " + continents[i].name + " hat sich 2018 im Vergleich zu 2008 die Emission um " + +((continents[i].e18 / continents[i].e08 * 100 - 100).toFixed(2)) + "% verändert");
    console.log("2018 im Vergleich zu 2008 sind das " + +((continents[i].e18 - continents[i].e08).toFixed(2)) + "kg CO2");
}

//Checken, welches Bild geklickt wird
function click() {
    var img = document.getElementsByTagName("img");

    for (let f = 0; f < img.length; f++) {
      img[f].addEventListener("click", function() {

        //Berechnung
        let relative = (continents[f].e18 / total18 * 100).toFixed(2);
        let growthpercent = (continents[f].e18 / continents[f].e08 * 100 - 100).toFixed(2);    
        let growthabsolute = (continents[f].e18 - continents[f].e08).toFixed(2);

        //DOM und CSS Manipulation
            document.getElementById("e18").innerHTML = continents[f].e18;
            document.getElementById("heading").innerHTML = continents[f].eng;
            document.getElementById("titleRegion").innerHTML = continents[f].eng;
            document.getElementById("relative").innerHTML = relative;
            document.getElementById("growthpercent").innerHTML = growthpercent;
            document.getElementById("growthabsolute").innerHTML = growthabsolute;
            document.documentElement.style.setProperty("--percent", relative);
        });
    }
  }

//Funktionen erst ausführen, sobald die Seite geladen wurde
window.addEventListener("load", function() {
    click();
});