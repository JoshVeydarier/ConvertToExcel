
//Création de la classe UE
class UE {
  constructor(code, nom, nbCM, nbTD, nbTP, liGroupe) {
    this.CodeUE = code;
    this.Nom = nom;
    this.CM = nbCM;
    this.TD = nbTD;
    this.TP = nbTP;
    this.ListeGroupe = [];
    this.Creneaux = [];
    for (var i = 0; i < liGroupe.length; i++) {
      var t = liGroupe[i];
      this.ListeGroupe[i] = t;
      this.Creneaux[t] = [];
      this.Creneaux[t]['CM'] = [];
      this.Creneaux[t]['TD'] = [];
      this.Creneaux[t]['TP'] = [];
    }

  }
  getNom() {
    return this.Nom;
  }
  getCreneaux() {
    return this.Creneaux;
  }
  //Ajoute une CM à tous les groupes affectés à cette UE
  ajoutCM(date) {
    for (var i = 0; i < this.ListeGroupe.length; i++) {
      this.Creneaux[this.ListeGroupe[i]]["CM"].push(date); 
    }
  }
  //Ajoute un CM à un groupe particulier
  ajoutCMGroupe(date, groupe) {
    this.Creneaux[groupe]["CM"].push(date);
  }
  //Ajoute un TD à un groupe particulier
  ajoutTDGroupe(date, groupe) {
    this.Creneaux[groupe]["TD"].push(date);
  }
  //Ajoute un TP à un groupe particulier
  ajoutTPGroupe(date, groupe) {
    this.Creneaux[groupe]["TP"].push(date);
  }

  CMrestant() {
    return this.CM - this.Creneaux["A"]["CM"].length;
  }
}


//Il manque cette info dans le fichier JSON donc il faudra la rajouter depuis excel
var liGroupe = ["A", "B", "C", "D"];
var LiUE = new Object;
var liCodeUe = new Object;

/*
Fonction du cours de pompidor pour pouvoir récupérer le JSON.
En soit on aurait pu le faire en vanilla au final mais c'est peut être plus propre comme ça
en JQuery.
*/
function recupJSON() {
  $.getJSON("test3.json", function(data) {
    $.each(data, function(index, objet) {
      LiUE[objet.CodeUE] = new UE(objet.CodeUE, objet.NomUE, objet.CM, objet.TD, objet.TP, liGroupe);
      liCodeUe[objet.CodeUE] = objet.CodeUE;
    });
  });

}

module.exports = {recupJSON};
// Dès que la page est affichée, on appelle la fonction qui récupérer le JSON
// et va stocker tout ce qu'il faut dans les tableaux créés au dessus
//window.onload = function(){ recupJSON() ;};




