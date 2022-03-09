
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
	var out = toY_M_D(array_ferie[i]);
	return {
		start: out,
		end: out,
		display: 'background',
		overlap: false,
	}
};




//fonction qui a partir d'une date, genere un date au bon format ISO : YYYY-MM-DD
function toY_M_D(item) { return item.getFullYear().toString() + "-" + pad(item.getMonth() + 1).toString() + "-" + pad(item.getDate()).toString() };

//fonction qui a partir d'une date, genere un date au bon format ISO : HH:MM:00
function toH_M_S(item) { return pad(item.getHours()).toString() + ":" + pad(item.getMinutes()).toString() + ":00" };


//fonction qui a partir d'un event, retourne true si il est sur un jour férié et false sinon.

function ferie(event) {
	var date_event = toY_M_D(event._instance.range.start); // Recup la date de l'event au bon format YYYY-MM-DD
	var res = false;
	//Parcours de toutes les dates feriée
	all_ferie.forEach(item => {
		if (toY_M_D(item) == date_event) { // Si ka date de l'event correspond a une date feriée, on passe res a true
			res = true;
		};
	})
	return res;
};

//fonction qui a partir d'une date retourne true si elle est egale a un date ferié et false sinon.

function ferie_date(date) {
	var date= toY_M_D(date);
	var res = false;
	//Parcours de toutes les dates feriée
	all_ferie.forEach(item => {
		if (toY_M_D(item) == date) { // Si ka date de l'event correspond a une date feriée, on passe res a true
			res = true;
		};
	})
	return res;
};

//fonction pour acceder simplement au codeUE via un event/crenaux
function getcodeUE(event) {
	return event._def.extendedProps.CodeUE;
};


//fonction pour acceder simplement a la date de debut
function getstart(event) {
	return event._instance.range.start;
};

//fonction pour acceder simplement a la date de fin
function getend(event) {
	return event._instance.range.end;
};

//fonction pour acceder simplement au type d'un event
function gettype(event) {
	return event._def.extendedProps.Type;
};

//fonction pour acceder simplement au type d'un event
function getprof(event) {
	return event._def.extendedProps.profR;
};

//fonction pour acceder simplement au tableau contenant le/les groupes d'un event
function getgroupe(event) {
	return event._def.extendedProps.Groupe;
};




//fonction pour a partir d'un crenaux degager l'heure debut et fin au format : hh:mm-hh:mm
function getduree(event) {
	var start = getstart(event);
	var end = getend(event);
	return pad(start.getUTCHours().toString()) + ':' + pad(start.getMinutes().toString()) + '-' + pad(end.getUTCHours().toString()) + ':' + pad(end.getMinutes().toString());
};

//fonction qui a partir d'une date retourne le lundi de la semaine de la date 
function Mon_Week() {
	var date = new Date();
	if(date.getDay()==0){ // si on est dimanche, je reviens une semaine en arriere 
		return(new Date(date.setDate(date.getDate() - 7 + 1 )));
	}
	return new Date(date.setDate(date.getDate() - date.getDay() + 1));

};


//fonction qui a partir d'une date retourne le samedi de la semaine de la date 
function Sat_Week() {
	var date = new Date();
	if(date.getDay()==0){ // si on est dimanche, je reviens une semaine en arriere 
		return(new Date(date.setDate(date.getDate() - 7 + 6 )));
	}
	return new Date(date.setDate(date.getDate() - date.getDay() + 6));
};


//fonction qui a partir d'une date retourne le vendredi de la semaine de la date 
function Wen_Week() {
	var date = new Date();
	if(date.getDay()==0){ // si on est dimanche, je reviens une semaine en arriere 
		return(new Date(date.setDate(date.getDate() - 7 + 5 )));
	}
	return new Date(date.setDate(date.getDate() - date.getDay() + 5));
};

function Thu_Week() {
	var date = new Date();
	if(date.getDay()==0){ // si on est dimanche, je reviens une semaine en arriere 
		return(new Date(date.setDate(date.getDate() - 7 + 4 )));
	}
	return new Date(date.setDate(date.getDate() - date.getDay() + 4));
};

//GENERALISATION des fonctions au dessus : en arguement on donne un indice de 0 a 6 et une date (dimanche a lundi et cela va nous retourner la date correspondant au jour de la semaine)
function WeekDay(date,i) {
	if(date.getDay()==0){ // si on est dimanche, je reviens une semaine en arriere avant de lire le jour suivant
		return(new Date(date.setDate(date.getDate() - 7 + i )));
	}
	return new Date(date.setDate(date.getDate() - date.getDay() + i));
};
//fonction qui a partir d'une date et de H et M  retourne un timestamp YYYY-MM-DDTHH:MM:00 a cette date
function timestamp(date,ho,mi){
	return (toY_M_D(date)+'T'+pad(ho.toString())+':'+pad(mi.toString())+':00');
};

//fonction qui a partir de deux timestamps, prends la date du premier et l'heure/min du deuxieme pour créer un timestamp
function fuse_timestamp(date1,date2){
	return (toY_M_D(new Date(date1))+'T'+toH_M_S(new Date(date2)));
};

//fonction qui pour une date donné, retourne true si elle est bien entre les plages inf et sup du calendar.

function is_valid_date(date){
	return (date.getTime() >= plageinf.getTime() && date.getTime() < plagesup.getTime());
};