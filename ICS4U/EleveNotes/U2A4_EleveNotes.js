// tableau à 2 dimentions
var eleveInfo = [
	["Roberto","Luongo", 1, 0, 1, 2],
	["Jonathan","Toews", 19, 25, 18, 14],
	["Carey","Price", 26, 36, 30, 32],
	["Sidney","Crosby", 90, 84, 86, 88],
	["Wayne","Gretzky", 99, 99, 99, 99],
	["Connor","McDavid", 95, 99, 97, 97],
	["Patrick","Kane", 80, 96, 90, 86],
	["Nikita","Kucherov", 80, 92, 90, 84],
	["Alexander","Ovechkin", 0, 10, 8, 14],
	["Jamie","Benn", 20, 8, 16, 12],
	["Marc-André","Fleury", 30, 28, 32, 26],
	["John","Tavares", 99, 83, 92, 90],
	["Auston","Matthews", 30, 38, 33, 35],
	["Brady","Tkachuk", 25, 1, 1, 1],
	["David","Ayres", 99, 81, 89, 91],
];

// Variable pour la moyenne et message d'erreur
var affichage = "";
// Variables pour savoir si il y a des messages d'erreurs
var Amessge = 0;
var Smessge = 0;
var Mmessge = 0;

// Fonction qui affiche les éléments du tableau eleveInfo sur la page
function afficher() {
	var table = document.getElementById("myTable");
	//Vas voir chaque éléments du tableau
	for (rang = eleveInfo.length - 1; rang > -1; rang--) 
      {
        // Ajoute une rangée au tableau sur la page
        var row = table.insertRow(1);
       	//Vas voir tout les sous éléments du tableau
       	for(col = eleveInfo[0].length - 1; col > -1; col--)
        {
         	// Ajoute les données dans chaque cases de la rangée
         	var cell = row.insertCell(0);
         	cell.innerHTML = eleveInfo[rang][col];
        }
      }
}

// Fonction qui permêt d'ajouter des noms et notes au tableau
function ajouter() {

	//Variables qui contiennent les données entrés par l'utilisateur
	var nom = document.getElementById("nom").value;
	var prenom = document.getElementById("prenom").value;
	var note1 = document.getElementById("note1").value;
	var note2 = document.getElementById("note2").value;
	var note3 = document.getElementById("note3").value;
	var note4 = document.getElementById("note4").value;

	
	// Permêt de revenir à la liste après l'erreur
    if (Amessge == 1)
	{
		document.getElementById("outNote").innerHTML = "";
		Amessge = 0;
		document.getElementById("supprimer").disabled = false;
		document.getElementById("moyenne").disabled = false;
	}
	// Vérifie si il y a une erreur dans les informations entrés
	else if (prenom==null || nom==null || note1== "" || note2== "" || note3== "" || note4== "") {
		document.getElementById("outNote").innerHTML = "<br><br>Entrer une valeur dans tous les boites!!! <br><br>" + 
							 "Appuyer sur le bouton ajouter pour enlever le message d'erreur";
		Amessge = 1;
		document.getElementById("supprimer").disabled = true;
		document.getElementById("moyenne").disabled = true;
	}
	
	else{
		// Ajoutes les nouvelles information dans la tableau
		eleveInfo.push([prenom, nom, note1, note2, note3, note4]);
		
		var table = document.getElementById("myTable");
		var row = table.insertRow(eleveInfo.length);

		var cell6 = row.insertCell(0);
        cell6.innerHTML = note4;

        var cell5 = row.insertCell(0);
        cell5.innerHTML = note3; 
                
        var cell4 = row.insertCell(0);
        cell4.innerHTML = note2; 
        
        var cell3 = row.insertCell(0);
        cell3.innerHTML = note1; 

        var cell2 = row.insertCell(0);
        cell2.innerHTML = nom; 

        var cell1 = row.insertCell(0);
        cell1.innerHTML = prenom; 
	}
	//Rend les champs de texte note vide
	document.getElementById("note1").value = null;
	document.getElementById("note2").value = null;
	document.getElementById("note3").value = null;
	document.getElementById("note4").value = null;
}

//Fonction qui permêt de supprimer des donnés du tableau
function supprimer() {
	
	//Variables qui contiennent les données entrés par l'utilisateur
	var nom = document.getElementById("nom").value;
	var prenom = document.getElementById("prenom").value;

	var eleveIndiceP = -1;
    var eleveIndiceN = -1;

    // Permêt de revenir à la liste après un erreur
    if (Smessge == 1) {
		document.getElementById("outNote").innerHTML = "";
		Smessge = 0;
		document.getElementById("ajouter").disabled = false;
		document.getElementById("moyenne").disabled = false;
	}
	
	// Si il y a une valeure vide il vas avoir un message d'erreur
	else if(prenom=="" || nom=="") {
		document.getElementById("outNote").innerHTML = "<br><br>Entrer une valeur dans tous les boites de noms!!! <br><br>" + 
							 "Appuyer sur le bouton supprimer pour enlever le message d'erreur";
		Smessge = 1;
		document.getElementById("ajouter").disabled = true;
		document.getElementById("moyenne").disabled = true;
	}
	  
	else {
	    //Passe à travers tout les noms du tableau
	    for (rang = 0; rang < eleveInfo.length; rang++)  {
          eleveIndiceP =(eleveInfo[rang][0].indexOf(prenom));
          eleveIndiceN =(eleveInfo[rang][1].indexOf(nom));
          // Suprrime la rangée du tableau si les noms sont parreils
          if ((eleveIndiceP != -1) && (eleveIndiceN != -1)) {
           	eleveInfo.splice(rang,1);  // rang - indique la rangée à supprimer. 
		  							  // 1 - indique de supprimer cette rangée seulement.
          	document.getElementById("myTable").deleteRow(rang + 1);
          	Smessge = 0;
          	document.getElementById("outNote").innerHTML = "";
          	document.getElementById("ajouter").disabled = false;
			document.getElementById("moyenne").disabled = false;
          	break;
          }
          // Message si aucun noms a correspond au valeurs entrés
          else {
          	document.getElementById("outNote").innerHTML = "<br><br> Aucun noms correspond au valeurs entrés! <br><br>" +
          													"Appuyez sur le bouton supprimer pour enlever le message d'erreur";
          	Smessge = 1;
          	document.getElementById("ajouter").disabled = true;
			document.getElementById("moyenne").disabled = true;
          }
        }
	     // Affiche le tableau avec les modifications
	     
	}
	//Rend les champs de texte note vide
	document.getElementById("prenom").value = null;
	document.getElementById("nom").value = null;
}

//Fonction qui permêt de calculer la moyenne d'un élève
function moyenne()  {
	
	//Variables qui contiennent les données entrés par l'utilisateur
	var nom = document.getElementById("nom").value;
	var prenom = document.getElementById("prenom").value;
	  
	//Variable qui vas contenir la moyenne
	var moyenne = 0;
	
	//Vérifie si il y a un message d'erreur
	if (Mmessge == 1)
	{
		// Si oui, le message d'erreur s'enlève
		document.getElementById("outNote").innerHTML = "";
		Mmessge = 0;
		document.getElementById("ajouter").disabled = false;
		document.getElementById("supprimer").disabled = false;
	} 
	//Passe à travers tout les noms du tableau
	else for (var rang = 0; rang < eleveInfo.length; rang++) {
    	//Vérifie si les noms entrés par l'utilisateur et ceux dans le tableau sont parreils 
    	if ((eleveInfo[rang][0] == prenom) && (eleveInfo[rang][1] == nom))
		{
			var note1 = eleveInfo[rang][2] / 1;
			var note2 = eleveInfo[rang][3] / 1;
			var note3 = eleveInfo[rang][4] / 1;
			var note4 = eleveInfo[rang][5] / 1;
			var nomEleve = "";
			moyenne = (note1 + note2 + note3 + note4) / 4;
			moyenne = moyenne.toFixed(2);
			nomEleve = eleveInfo[rang][0] + " " + eleveInfo[rang][1];
		}
		
		//Si il y a une moyenne ça l'affiche le message ci-dessous
		if (moyenne != 0)
		{
	 		affichage = "<br>La moyenne de " + nomEleve + " est " + moyenne;
			document.getElementById("outNote").innerHTML = affichage;
			Mmessge = 0;
			document.getElementById("ajouter").disabled = false;
			document.getElementById("supprimer").disabled = false;
			break;
		}
		// Si aucun nom correspond au nom entré affiche le message ci-dessous
		else
		{
			document.getElementById("outNote").innerHTML ="<br><br> Aucun élève correspond a ce nom" + 
														  "<br><br>Appuyez sur le bouton Moyenne de l'élève enlever le message d'erreur";
			Mmessge = 1;
			document.getElementById("ajouter").disabled = true;
			document.getElementById("supprimer").disabled = true;
		}
	}
}