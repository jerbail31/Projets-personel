 #Jérémy Baillargeon
#300230276
#Un jeu de pierres
#Change la variable joueur Actuel
def changeJoueurActuel(joueurActuel):
    if joueurActuel==1:
        return 2
    else :
        return 1

TOTAL = 20 #nombre de pierres dans le jeu
MAX= 5 #Maximum de pierres déplacés dans 1 tour
pile = TOTAL
#Var int qui dit c'est à qui le tours
joueurActuel = 1
#Var bool qui regarde si l'entrée est valide
est_valide = False
print('Au tour du joueur ' + str(joueurActuel) + '. Il y a ', pile, 'pierres en tout.')

while pile > 0 : 
    #Continue jusqu'à ce que l'entrée est valide
    while est_valide==False:
        enlevePierre = input('Joueur '+str(joueurActuel)+': combien de pierres pouvez-vous déplacer? ')
        #Vérifie si l'entrée est valide
        if enlevePierre.isnumeric() :
            enlevePierre = int(enlevePierre)
            est_valide = bool(1<= enlevePierre<=MAX and enlevePierre<=pile )
        #Envoie un message si l'entrée est invalide
        if est_valide == False:
            print("Nombre invalide, il doit être entre 1 et 5, et vous ne pouvez pas ")
            print("ramasser plus qu'il n'y en a dans la pile")
    #Vérifie si le jeu est terminé          
    if enlevePierre == pile :
        print('Bravo, Joueur', joueurActuel, 'a gagné !')
        print('Jeu terminé.')
        pile = 0
    #Retire les pierres du jeu
    else :
        pile -= enlevePierre
        joueurActuel = changeJoueurActuel(joueurActuel)
        print('Au tour du joueur '+str(joueurActuel)+'. Il y a', pile, 'pierres en tout.')
        est_valide = False
        
