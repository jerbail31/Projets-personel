/*	Nom du fichier:	U4A4_ProjetFinal
	Programmeur: 	Jérémy Baillargeon
	Date:			Mai-Juin 2020
	Description:	Application qui permêt de commander des items sur un menu et
					qui les affiche  sur un autre partie de la page. 
*/
var r = 1;
//Tableau qui contitent la catégorie dont les items se retrouvent
var titre = ["Frite", "Poutine", "Combos", "Sandwichs", "À côté", "Breuvage"]
//Tableau qui contient le items sur le menu ainsi que leur prix
var menu = [
	["Petite", 3.00, "Moyenne", 4.00, "Grande", 5.00, "Familiale", 8.00],
	["Petite", 5.00, "Moyenne", 6.00, "Grande", 7.00, "Familiale", 10.00],
	["2 Hotdogs<br>Frite moyenne<br>Breuvage", 8.00,  "Hamburger<br>Frite moyenne<br>Breuvage", 8.00, "2 Pogos<br>Frite moyenne<br>Breuvage", 7.00, "Poutine moyenne<br>Pogo<br>Breuvage", 8.00],
	["Hotdog", 2.00, "Hamburger", 4.00, "Wrap au poulet", 6.00, "Mini burger(3)", 6.00],
	["Pogo", 1.50, "Rondelles d'onion", 4.00, "Salade César", 6.00, "Sauce gravy", 0.50],
	["CocaCola", 1.00, "Ginger Ale", 1.00, "Jus d'orange", 1.50, "Eau", 1.50],
];

//Tableau qui contitent le nombre d'items différent de la commande en cours
var commander = [];
//Tableau qui contient le prix de tout les items commandés de la commande en cours
var itemsCommander = [];
//Tableau qui contient le nombres d'items commandé pour chaque item de la commande en cours
var nItemsCommander = [];
//Tableau qui contitent le nombre de commandes commandés en cours
var commandeEnCours = [];

//Contient le sous total de la commande de la commande en cours
var sousTotal = 0;
//Contient le total de la commande de la commande en cours
var total = 0;
//Contient le nombre total d'items commandés de la commande en cours
var tItems = 0;
//Variable qui aide avec la fonction du click sur btnSupprimer
var ordre = 0;
//Variable qui aide avec la fonction du click sur btnEnlever
var enCours = 0;

//Fonction qui vas du menu d'accueil au autres parties selon le bouton clické
function accueil() {
	//Condition qui décide quel partie du site afficher
	if (x == menu) {
		//Affiche la partie menu
		document.getElementById("partieMenu").style.display = "block";
	}
	else if (commandeEnCours.length != 0) {
		//Affiche la partie des commandes
		document.getElementById("partieCommande").style.display = "block";
	}
	else{
		alert("Il y a aucune commande en cours. Appuyer sur le bouton menu pour commander")
		return;
	}
	//Fait disparaître la page d'accueil
	document.getElementById("accueil").style.display = "none";
	//Fait apparaître le boutton qui permêt de retourner à l'accueil
	document.getElementById("retourAccueil").style.display = "block";

}

//Fonction qui permêt de retourner à l'accueil appeler par le bouton retour accueil
function retourAccueil() {

	//Vérifie si la commande a été commandé ou non
	if (x==1) {	
		//Vérifie si l'utilisateur est dans la partie commande
		if (document.getElementById("partieCommande").style.display == "none") {
			//Vérifie si aucun item a été rajouté à la liste
			if (commander.length != 0) {
				//Crée un alert qui crée un message qui dit que continuer vas supprimer la commande
				if (confirm("Vous allez perdre votre commande si vous retournez à l'accueil")) {
			    	//Remêt les variables à leur valeur originale
			    	reset();
			  	} 
			  	else {
			    	//Si l'utilisateur ne veut pas retourner au menu, sort de la fonction
			    	return;
			  	}
			}
		}
	}

	//Appelle la fonction retourMenu
	retourMenu();
	
	//Affiche la page d'accueil
	document.getElementById("accueil").style.display = "block";
	//Enlève l'apparence des parties menu et commande
	document.getElementById("partieMenu").style.display = "none";
	document.getElementById("partieCommande").style.display = "none";
	//Enlève l'apparence
	document.getElementById("retourAccueil").style.display = "none";

}

//Fonction qui retourne au début de la partie Menu
//Appeler par le bouton retour menu ou par d'autre fonction qui veulent remettre la partie menu à l'original
function retourMenu () {
	//Affiche le bouton de commande, de caisse et ceux avec le type d'items
	document.getElementById("principal").style.display = "block";
	document.getElementById("commande").style.display= "block";
  	document.getElementById("caisse").style.display= "block";
  	document.getElementById("total").style.display= "block";

  	//Enlève l'apparence à ces parties de la partie menu
  	document.getElementById("ajouteCommande").style.display= "none";
  	document.getElementById("commandeFinal").style.display= "none";
  	document.getElementById("apresCommande").style.display = "none";
  	document.getElementById("secondaire").style.display = "none";
	document.getElementById("retour").style.display = "none";
	document.getElementById("tCommande").style.display= "none";

}

//Fonction qui affiche les items selon la catégorie appuyé
//Appeler par un click sur un des boutons avec la catégorie des items
function principal() {

	//Enlève l'apparence au boutons avec la catégorie des items
	document.getElementById("principal").style.display = "none";

	//Ajoute le texte sur les boutons selon la catégorie appuyé
	//Les paramêtres donnent une valeure à x qui permêt de savoir la catégorie appuyé
	document.getElementById("sBouton1").innerHTML = menu[x][0] + "<br>" + menu[x][1].toFixed(2) + "$";
	document.getElementById("sBouton2").innerHTML = menu[x][2] + "<br>" + menu[x][3].toFixed(2) + "$";
	document.getElementById("sBouton3").innerHTML = menu[x][4] + "<br>" + menu[x][5].toFixed(2) + "$";
	document.getElementById("sBouton4").innerHTML = menu[x][6] + "<br>" + menu[x][7].toFixed(2) + "$";
	
	//Affiche le bouton retours et ceux avec les boutons avec le nom des items et leur prix
	document.getElementById("retour").style.display = "block";
	document.getElementById("secondaire").style.display = "block";
}

//Fonction qui ajoute l'item au panier
//Appeler par un click sur les boutons avec un nom d'items
function secondaire() {
	//Crée un alert qui permêt l'utilisateur d'entrer le nombre d'items qu'il veut commander
  	var nItems = prompt("Quantité:", "1");
  	//Si le nombre d'items voulu est 0. on sort de la fonction
  	if (nItems == null) {
  		return;
  	}
  	//Vérifie si c'est un entier positif
  	else if(nItems >= 1) {
  		//Calcule le total, le sous total et le nombre d'items
  		sousTotal = sousTotal + menu [x][y] * nItems;
  		total = sousTotal * 1.13;
  		tItems = tItems + nItems*1;
  		//Affiche le total, le sous total et le nombre d'items
  		document.getElementById("total").innerHTML="Items : "+tItems+" ---- Sous total : "+sousTotal.toFixed(2)+"$ ---- Total : "+total.toFixed(2)+"$";
  		  			
  		//Ajoute l'ordre des boutons "supprimer" dans le tableau pour voir ta commande
  		commander.push(ordre);
  		//Ajoute le prix de l'item commandé dans un tableau
  		itemsCommander.push(menu[x][y]);
  		//Ajoute le nombre d'items commandé dans un tableau
  		nItemsCommander.push(nItems*1);


  		//Crée le bouton qui permêt de supprimer les items de la commande
  		var btnSupprimer = document.createElement("BUTTON");
  		//Ajoute le texte à l'intérieur du boutton
  		btnSupprimer.innerHTML = "Supprimer l'item";
  		//Ajoute un id au bouton pour permettre de différentier les bouttons
  		btnSupprimer.setAttribute("id", ordre);
  		btnSupprimer.setAttribute("class", "btnTableau")
  		ordre++;

  		// Ajoute une rangée au tableau qui contient ta commande
  		var tableCommande = document.getElementById("tCommande");
		row = tableCommande.insertRow(commander.length);
  		
		//Crée une variable contenant le prix de l'item
  		var prixItem = (menu[x][y] * (nItems*1)).toFixed(2) + "$";
  		//Crée une variable contenant le nom de l'item
  		var nomItem = titre[x] + " : " + menu[x][y-1];


  		//Met btnSupprimer dans une colone
  		var cell4 = row.insertCell(0);
        cell4.appendChild(btnSupprimer);
        //Met le prix de l'item dans une colone
        var cell3 = row.insertCell(0);
        cell3.innerHTML = prixItem; 
        //Met le nombre de cet item dans une colone       
        var cell2 = row.insertCell(0);
        cell2.innerHTML = nItems; 
        //Met le nom de l'item dans une colone
        var cell1 = row.insertCell(0);
        cell1.innerHTML = nomItem; 

        //Rends les boutons caisse et commande actifs
        document.getElementById("caisse").disabled = false;
		document.getElementById("commande").disabled = false;

  		//fonction qui permêt de supprimer des lignes du tableau de commande
  		btnSupprimer.addEventListener ("click", function(){

  			//Vérifie chaque ligne du tableau
  			for (var b = 0; b < commander.length; b++) {
	 			//Vérifie quel bouton a été cliquer en vérifiant le "id"
				if ( btnSupprimer.getAttribute("id")== commander[b]) {
					//Enlève cette rangée du tableau 
	      			document.getElementById("tCommande").deleteRow(b + 1);
	      			//Enlève l'élément supprimer des autres tableaux
	      			commander.splice(b, 1);
					itemsCommander.splice(b, 1);
	      			nItemsCommander.splice(b, 1);
					//Vérifie si il reste des items dans la commande
	      			if (itemsCommander.length == 0) {
	      				//met les variable à 0
	      				tItems = 0;
	      				total = 0;
	      				sousTotal = 0;
	      				//Fait appel à la fonction retour menu
	      				retourMenu();
	  					//Rends les boutons caisse et commande inactif
	  					document.getElementById("caisse").disabled = true;
						document.getElementById("commande").disabled = true;
	      			}
	      			//Si il reste des items dans la commande
	      			else {
	      				//Recalcule le sous total
		      			sousTotal=0;
		      			for (var i = itemsCommander.length-1; i >= 0; i--) {
		      		
		      				sousTotal= sousTotal + (itemsCommander[i]*nItemsCommander[i]);
		      			}
		      			//Calcule le total
	  					total = sousTotal * 1.13;
	  					//Recalcule le nombre d'items
	  					tItems = 0;
	  					for (var i = nItemsCommander.length-1; i >= 0; i--) {
	  						tItems = nItemsCommander[i] + tItems;
	  					}
	  				}	
	  				//Affiche le nouveau total, sous total et le nombre d'items
	  				document.getElementById("total").innerHTML="Items : "+tItems+" ---- Sous total : "+sousTotal.toFixed(2)+"$ ---- Total : "+total.toFixed(2)+"$";
				}
			}
  		});  		
  	}
  	//Si une valeure invalide est rentré il y a une alerte
  	else {
  		alert("Donnée entrré invalide. Entrer une valeure positive numérique");
  		//Sort de la fonction
  		return;
  	}
  	//Retourne au au début de la partie menu
  	document.getElementById("principal").style.display = "block";
	document.getElementById("secondaire").style.display = "none";
	document.getElementById("retour").style.display = "none";

}
//Fonction qui affiche la commande finale
//Appeler sur un click du bouton passer à la caisse
function caisse() {
	//Affiche seulement le bouton retour et ajoute commande ainsi que le texte de la commande
	document.getElementById("principal").style.display = "none";
	document.getElementById("secondaire").style.display = "none";
  	document.getElementById("commande").style.display = "none";
  	document.getElementById("tCommande").style.display= "none";
  	document.getElementById("caisse").style.display= "none";

    document.getElementById("commande").style.display= "block";
  	document.getElementById("retour").style.display= "block";
  	document.getElementById("ajouteCommande").style.display= "block";
  	document.getElementById("commandeFinal").style.display= "block";

  	//Crée les variables contenant le prix et le nom des items
  	var commandeFinalNom = "";
   	var commandeFinalPrix = "";
  	//Vas chercher le nom et le prix des items dans la commande
  	var tableauCommande = document.getElementById("tCommande")
  	for (var r = tableauCommande.rows.length -1; r > 0; r--) {
  		//Remplace les tags "br" par |
  		var nomSansBR = tableauCommande.rows[r].cells[0].innerHTML;
  		nomSansBR = nomSansBR.replace(/\<br\>/g," | ");
  		//Ajoute un item et son prix à la variable de texte
  		commandeFinalNom = "&nbsp&nbsp" + tableauCommande.rows[r].cells[1].innerHTML + "&nbsp x &nbsp " + nomSansBR + "<br><br>" + commandeFinalNom;
  		commandeFinalPrix = tableauCommande.rows[r].cells[2].innerHTML +"<br><br>" + commandeFinalPrix;
  	}
	
	//Ajoute le nom et le prix au variables de texte
	commandeFinalNom = commandeFinalNom + "<br><br>&nbsp&nbsp # d'items : <br><br>&nbsp&nbsp Sous total : <br><br>&nbsp&nbsp Total :<br><br>"
	commandeFinalPrix = commandeFinalPrix + "<br><br>" + tItems + "<br><br>" + sousTotal.toFixed(2)+"$<br><br>" + total.toFixed(2)+"$<br><br>"
	//Ajoute les variables au message de commande
	document.getElementById("commandeFinalNom").innerHTML = "<br>" + commandeFinalNom;
	document.getElementById("commandeFinalPrix").innerHTML = "<br>" + commandeFinalPrix;


}

//Fonction qui affiche la commande sur un click du bouton "voir la commande"
function commande() {

		document.getElementById("principal").style.display = "none";
		document.getElementById("secondaire").style.display = "none";
	  	document.getElementById("commande").style.display = "none";
	  	document.getElementById("tCommande").style.display= "inline-table";
	    document.getElementById("commande").style.display= "none";
	  	document.getElementById("retour").style.display= "block";
  	  	document.getElementById("commandeFinal").style.display= "none";
  	  	document.getElementById("caisse").style.display= "block";
  	  	document.getElementById("ajouteCommande").style.display= "none";

	

}

//Fonction qui finalize la commande. Affiche un message qui permêt de retourner au menu principal
//Et qui mêt la commande sur la liste de commande
function ajouteCommande() {
	
	//Vérifie si l'utilisateur veut avoir un reçu de sa commande
	if (confirm("Voulez vous imprimer le reçu?")) {
		document.getElementById("ajouteCommande").style.display = "none";
		document.getElementById("retour").style.display = "none";
		document.getElementById("retourAccueil").style.display = "none";
		document.getElementById("commande").style.display = "none";
		document.getElementById("total").style.display= "none";
		window.print();
	}

	//Affiche le message de sortie
	document.getElementById("total").style.display= "none";
	document.getElementById("ajouteCommande").style.display = "none";
	document.getElementById("retour").style.display = "none";
	document.getElementById("commandeFinal").style.display = "none";
	document.getElementById("retourAccueil").style.display = "none";
	document.getElementById("commande").style.display = "none";

	document.getElementById("apresCommande").style.display = "block";
	
	//Remet la variable qui contient la commande à vide
	var itemsCommande = "";
	//Vas chercher le tableau qui contient les éléments de la commande
	var tableauCommande = document.getElementById("tCommande")
  	
  	for (var r = tableauCommande.rows.length -1; r > 0; r--) {
  		//Remplace les tags "br" par |
  		var nomSansBR = tableauCommande.rows[r].cells[0].innerHTML;
  		nomSansBR = nomSansBR.replace(/\<br\>/g," | ");
  		//Ajoute un item et son prix à la variable de texte
  		itemsCommande = "<br>" + tableauCommande.rows[r].cells[1].innerHTML + " x " + nomSansBR + "<br>" + itemsCommande ;
  	}
  	itemsCommande = itemsCommande + "<br>"

	//Appel la fonction reset
	reset();
	//Ajoute l'ordre des boutons "supprimer" dans le tableau pour voir ta commande
  	commandeEnCours.push(enCours);
	//Crée le bouton qui permêt de supprimer les items de la commande
  	var btnTerminer = document.createElement("BUTTON");
  	//Ajoute le texte à l'intérieur du boutton
 	btnTerminer.innerHTML = "Enlever l'item";
 	//Ajoute un id au bouton pour permettre de différentier les bouttons
 	btnTerminer.setAttribute("id", enCours);
 	btnTerminer.setAttribute("class", "btnTableau");
  	
  	enCours++;

  	// Ajoute une rangée au tableau qui contient ta commande
  	var tableCommandeEnCours = document.getElementById("tEnCours");
	rowC = tableCommandeEnCours.insertRow(commandeEnCours.length);
    var numeroCommande = Math.floor(Math.random() * 501 + 1)

	document.getElementById("numeroCommande").innerHTML = "Votre numéro de commande est "+numeroCommande

    //Met le prix de l'item dans une colone
    var cell3C = rowC.insertCell(0);
    cell3C.appendChild(btnTerminer); 
    //Met le nombre de cet item dans une colone       
    var cell2C = rowC.insertCell(0);
    cell2C.innerHTML = itemsCommande; 
    //Met le num de l'item dans une colone
    var cell1C = rowC.insertCell(0);
    cell1C.innerHTML = numeroCommande; 
    cell1C.style.textAlign = "center";

  	//fonction qui permêt de supprimer des lignes du tableau de commande
  	btnTerminer.addEventListener ("click", function(){
  		//Vérifie chaque ligne du tableau
  		for (var b = 0; b < commandeEnCours.length; b++) {
			//Vérifie quel bouton a été cliquer en vérifiant le "id"
			if ( btnTerminer.getAttribute("id")== commandeEnCours[b]) {
				//Enlève cette rangée du tableau 
	   			document.getElementById("tEnCours").deleteRow(b + 1);
	   			//Enlève l'élément supprimer du tableau
	   			commandeEnCours.splice(b, 1);

				//Vérifie si il reste des commandes à faire
	      		if (commandeEnCours.length == 0) {
	      			retourAccueil();
	      		}		
			}
		}
	});
}
//Fonction qui remet des variables à leur valeur innitiale
//Utiliser quand la commande est supprimé ou quand la commande est ajouté
function reset() {
	
	//Remet le sous total, total et le nombre d'item à 0
	document.getElementById("total").innerHTML="Items : 0 ---- Sous total : 0.00$ ---- Total : 0.00$";
	//Rends le tableau qui permêt de modifier ta commande vide
	for (var i = commander.length; i > 0; i--) {
		document.getElementById("tCommande").deleteRow(i);
	}
	//Remet les variables ci-dessous à leur valeur originale
	commander = [];
	itemsCommander = [];
	nItemsCommander = [];
	sousTotal = 0;
	total = 0;
	tItems = 0;
	ordre = 0;
	//Rends les boutons caisse et commande inactif
	document.getElementById("caisse").disabled = true;
	document.getElementById("commande").disabled = true;
}