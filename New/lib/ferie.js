function JoursFeries(an) {
	var JourAn = new Date(an, "00", "01")
	var FeteTravail = new Date(an, "04", "01")
	var Victoire1945 = new Date(an, "04", "08")
	var FeteNationale = new Date(an, "06", "14")
	var Assomption = new Date(an, "07", "15")
	var Toussaint = new Date(an, "10", "01")
	var Armistice = new Date(an, "10", "11")
	var Noel = new Date(an, "11", "25")
	//var SaintEtienne = new Date(an, "11", "26")

	var G = an % 19
	var C = Math.floor(an / 100)
	var H = (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * G + 15) % 30
	var I = H - Math.floor(H / 28) * (1 - Math.floor(H / 28) * Math.floor(29 / (H + 1)) * Math.floor((21 - G) / 11))
	var J = (an * 1 + Math.floor(an / 4) + I + 2 - C + Math.floor(C / 4)) % 7
	var L = I - J
	var MoisPaques = 3 + Math.floor((L + 40) / 44)
	var JourPaques = L + 28 - 31 * Math.floor(MoisPaques / 4)
	var Paques = new Date(an, MoisPaques - 1, JourPaques)
	//var VendrediSaint = new Date(an, MoisPaques - 1, JourPaques - 2)
	var LundiPaques = new Date(an, MoisPaques - 1, JourPaques + 1)
	var Ascension = new Date(an, MoisPaques - 1, JourPaques + 39)
	var Pentecote = new Date(an, MoisPaques - 1, JourPaques + 49)
	var LundiPentecote = new Date(an, MoisPaques - 1, JourPaques + 50)

	return new Array(JourAn, Paques, LundiPaques, FeteTravail, Victoire1945, Ascension, Pentecote, LundiPentecote, FeteNationale, Assomption, Toussaint, Armistice, Noel)
}

//Fonction pour ajouter le 0 si necessaire
function pad(number) {
	if (number < 10) {
		return '0' + number;
	}
	return number;
};

//fonction pour generer a partir d'un jour ferie code dans le tableau "array_ferie" la date au bon format
function ferie_gen(array_ferie, i) {
	var out = array_ferie[i].getFullYear().toString() + "-" + pad(array_ferie[i].getMonth() + 1).toString() + "-" + pad(array_ferie[i].getDate()).toString();
	return {
		start: out,
		end: out,
		display: 'background',
		overlap: false,
	}
};

