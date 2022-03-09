
/*
Fonction qui va être appelée afin de générer les evenements draggables.
Elle va vérifier le nombre de CM restants et les afficher si il en reste.
Il faut encore faire la vérification des TD restants pour chaque groupe donc
ajouter des méthodes dans la classe UE, pareil pour les TP.
*/
function loadExtEvents()
{

  for (var i in liCodeUe) {

    //Ajout du nom de l'UE dans cette case
    document.getElementById('external-events').innerHTML +=
    '<p> <strong>'+ LiUE[i].Nom +' </strong> </p>';
    //Ajout d'une case CM draggable
    if(LiUE[i].CMrestant() > 0)
    {
      document.getElementById('external-events').innerHTML +=
      '<div id="'+i+'" class=\'fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event\'>' +
        '<div class="fc-event-main">' +
          '<div>CM (' +
            LiUE[i].CMrestant() +
          ')</div>' +
        '</div>' +
      '</div>';
    }

    //Ajout d'une case TD draggable
    document.getElementById('external-events').innerHTML +=
      '<div id="'+i+'" class=\'fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event\'>' +
        '<div class="fc-event-main">' +
          '<div>TD (' +
            LiUE[i].TD +
          ')</div>' +
        '</div>' +
      '</div>';
    //Ajout d'une case TP draggable
    document.getElementById('external-events').innerHTML +=
      '<div id="'+i+'" class=\'fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event\'>' +
        '<div class="fc-event-main">' +
          '<div class="case-ctp">TP (' +
            LiUE[i].TP +
          ')</div>' +
        '</div>' +
      '</div>';
 
  }

}


/* 
Timer qui va au bout de 2 secondes appeler la fonction du dessus.
Sans ce timeout le JSON ne se charge pas assez vite en local.
*/
let timer = setTimeout(loadExtEvents, 2000);

  

/*
Fonction qui va récupérer vérifier si l'élément qu'on drop est un CM, un TD ou un TP.
On s'en sert dans la méthode drop du calendrier dans test5.html.
*/
function course(str_course)
{
  if(str_course.startsWith('CM'))
  {
    return 'CM';
  }
  else if(str_course.startsWith('TD'))
  {
    return 'TD';
  }
  else if(str_course.startsWith('TP'))
  {
    return 'TP';
  }  
  else
  {
    alert("Erreur de fonction 'wichCourse'");
  }
}


/*
Fonction qui va permettre de recharger les Events (quand on drop un CM, décrémenter de 1 à chaque fois)
Donc on va mettre à vide la partie external-events pour ensuite la recharger avec la fonction de base.
*/
function reloadEvents()
{
  document.getElementById('external-events').innerHTML = "";
  loadExtEvents();
}


/*
Fonction qui géré le drop si c'est un CM.
*/
function dropCM(el_ue, info_element)
{
  
  el_ue.ajoutCM(info_element.date);
  reloadEvents();

}


/*
Même principe que dropCM() sauf que ce n'est pas encore fait car il faut gérer le système de groupe,
pareil pour les TP
*/
function dropTD(el_ue, info_element)
{
  alert("ça marche td");
}

function dropTP(el_ue, info_element)
{
  alert("ça marche tp");

}


/*

TO-DO list :

* Faire en sorte que quand on drop un élément, on ait juste le code UE + le type (cm, td, tp)
  et non pas "CM(41)"

* Faire le dropTD() et dropTP() en fonction des groupes

* Mettre en place la possibilité de choisir un groupe pour les TD et TP
  Plusieurs possibilités :
    - pouvoir cliquer sur l'élément, une fois droppé, et selectionner un groupe
    - dans le menu des events draggables, lorsqu'on clique sur TD ou TP, avec une animation
      CSS, les events (TD-B, TD-A, ...) apparaissent (ce qu'on a commencé à voir)
    - pouvoir cliquer sur l'élément, avant de drag, et selectionner un groupe

Pour l'instant on n'a pas encore pensé à d'autres choses si mes souvenirs sont bons.

*/
  
  
  
  
  