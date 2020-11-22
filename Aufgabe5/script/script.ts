//Datengrundlage
var continent = {
    0: {
        name: "Afrika",
        e08: 1028,
        e18: 1235.5,
    },
    1: { 
        name: "Südamerika",
        e08: 1132.6,
        e18: 1261.5,
    },
    2: { 
        name: "Europa",
        e08: 4965.7,
        e18: 4209.3,
    },
    3: { 
        name: "Nordamerika",
        e08: 6600.4,
        e18: 6035.6,
    },
    4: { 
        name: "Asien",
        e08: 12954.7,
        e18: 16274.1,
    },
    5: { 
        name: "Australien",
        e08: 1993,
        e18: 2100.5,
    }
};

//Gesamt
var total18 = continent[0].e18 + continent[1].e18 + continent[2].e18 + continent[3].e18 + continent[4].e18 + continent[5].e18;
console.log("Gesamtemissionen 2018: " + total18);

//Ausgabe in Konsole
for (var i = 0; i < Object.keys(continent).length; i++) {
    console.log("////")
    console.log("Die Emission von " + continent[i].name + " ist: " + continent[i].e18 + "kg CO2");
    console.log("Relativ zur Gesamtemission der Welt verursacht " + continent[i].name + " damit " + +((continent[i].e18 / total18 * 100).toFixed(2)) + "%"); //mit +() umschliessen, sonst string
    console.log("Für " + continent[i].name + " hat sich 2018 im Vergleich zu 2008 die Emission um " + +((continent[i].e18 / continent[i].e08 * 100 - 100).toFixed(2)) + "% verändert");
    console.log("2018 im Vergleich zu 2008 sind das " + +((continent[i].e18 - continent[i].e08).toFixed(2)) + "kg CO2");
}