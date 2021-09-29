// Fonction qui calcule le nombre de combinaison de k parmis n 
function calculer() {
	
	//variable qui contient le nombre de combinaisons totale
	var total;
	//Variable qui contient les valeurs entrés par l'utilisateur
	var k = document.getElementById("k").value*1;
	var n = document.getElementById("n").value*1;
	//Variable avec la différence de n - k (pour la formule)
	var dif = n - k;
	
	//Condition qui vérifie si tous les boites de textes sont remplis
	if (document.getElementById("n").value == "" || document.getElementById("k").value=="") {
		document.getElementById("outnote").innerHTML = "Entrer une valeure numérique dans tous les boites de texte";
		return;
	}
	
	// Condition qui regarde si la valuere entrée est moins que 0
	if (k < 0 || n < 0) {
		// Renvoie un message d'erreur et interompe la fonction
		document.getElementById("outnote").innerHTML = "La valeure k ou de n ne peut pas être négatif";
		return;
	}

	// Condition qui regarde si la valeure de k est plus grand que n
	if (k > n) 
	{
		// Renvoie un message d'erreur et interompe la fonction
		document.getElementById("outnote").innerHTML = "La valeure k doit être plus petite que celle de n";
		return;
	}
	
	//Appelle une fonction qui calcule le factoriel de chaque donnée
	var x = n;
	var factN = CalculeFact(x);
	
	x = k;
	var factK = CalculeFact(x);
	
	x = dif;
	var factDif = CalculeFact(x);
	
	//Calcule le nombre de combinaisons en utilisant la formule
	total = factN/(factK*factDif)
	
	//Affiche la valeure totale
	document.getElementById("outnote").innerHTML = "Le nombre de combinaisons de " + k + " parmis " + n + " est égal à " + total;
}
// Fonction qui calcule le factioriel d'un nombre
function CalculeFact(x) {

	if (x==0 || x==1) 
	{
		return 1;
	}
	else
	{
		return (x * CalculeFact(x-1))
	}
}