# <span style="text-decoration: underline red;">Proposition de tables bdd</span>

### <span style="text-decoration: underline green;">1 - Un table pour les users (gerant, cuisinier, receptionniste, serveurs)</span>

Contenant :
 - id (int auto-increment primary-key)
 - mot de passe
 - type


### <span style="text-decoration: underline green;">2 - Une table personnels (Jean-Eudes, Michelle, etc.)</span>

Contenant :
 - id (int auto-increment primary-key)
 - id user (int)
 - nom


### <span style="text-decoration: underline green;">3 - Une table tables (table de 6, 4, 10, etc.)</span>

Contenant :
 - id (int auto-increment primary-key)
 - taille (int)
 - place x dans la pièce (pour le plan interactif) (float)
 - place y dans la pièce (pour le plan interactif) (float)


### <span style="text-decoration: underline green;">4 - Une table stock (Carottes, steak, pommes de terre, etc.)</span>

Contenant
 - id (int auto-increment primary-key)
 - nom ingrédient (string)
 - type (liquide, solide, unité, etc. pour determiner unité quantité) (bool)
 - quantité (int)


### <span style="text-decoration: underline green;">5 - Un table affectation table (Jean-Eudes affecté à table n°6, etc.)</span>

Contenant :
 - id (int auto-increment primary-key)
 - id serveur (int)
 - id table (int)
 - mission (servir, nettoyer)


### <span style="text-decoration: underline green;">6 - Une table reservation (Reservation pour 6 personnes le 6 decembre 2023 à 19h, etc.)</span>

Contenant :
 - id (int auto-increment primary-key)
 - nombre personnes (int)
 - id table(table réservé automatique) (int)
 - nom (string)
 - mail (string)
 - date (date)


### <span style="text-decoration: underline green;">7 - Une table commande (salade commandé pour la table 6, etc.)</span>

Contenant :
 - id (int auto-increment primary-key)
 - id plat (int)
 - id reservation (int)
 - heure (date)
 - etat (en attente, reçu, fini)


### <span style="text-decoration: underline green;">8 - Une table plat (salade césar, steak frite, entrecôte, etc.)</span>

Contenant :
 - id (int auto-increment primary-key)
 - nom (string)
 - id specialite (int)
 - prix (float)
 - id type (entrée, plat, dessert, boisson, etc.) (int)


### <span style="text-decoration: underline green;">9 - Une table type (entrée, plat, dessert, boisson, etc.)</span>

Contenant :
 - id (int auto-increment primary-key)
 - nom (string)


### <span style="text-decoration: underline green;">10 - Une table composition (salade césar contient salade, tomate, etc.)</span>

Contenant :
 - id (int auto-increment primary-key)
 - id plat (int)
 - id ingrédient (int)
 - quantité (int)


### <span style="text-decoration: underline green;">11 - Une table mission ()</span>

Contenant :
 - id (int auto-increment primary-key)
 - nom (servir, nettoyer)


### <span style="text-decoration: underline green;">12 - Une table plat en préparation (salade césar en préparation, etc.)</span>

Contenant :
 - id (int auto-increment primary-key)
 - id plat (int)
 - id ingrédient (int)
 - id serveur (int)
 - id reservation (int)
 - etat (en préparation, prêt, envoyé en salle -> int)


### <span style="text-decoration: underline green;">13 - Une table caisse</span>

Contenant :
 - id (int auto-increment primary-key)
 - id reservation (int)
 - montant virement (float)
 - type (virement / espèce) (bool)
 - date (date)


### <span style="text-decoration: underline green;">14 - Une table specialité</span>

Contenant :
 - id (int auto-increment primary-key)
 - nom (string)


### <span style="text-decoration: underline green;">15 - Une table specialité cuisinier/span>

Contenant :
 - id (int auto-increment primary-key)
 - id cuisinier (int)
 - id specialité (int)


### <span style="text-decoration: underline green;">16 - Une table Questions</span>

Contenant :
 - id (int auto-increment primary-key)
 - question (string)


### <span style="text-decoration: underline green;">17 - Une table Réponses</span>

Contenant :
 - id (int auto-increment primary-key)
 - id question (int)
 - réponse (string)


### <span style="text-decoration: underline green;">18 - Une table questions aliment</span>

Contenant :
 - id (int auto-increment primary-key)
 - id question (int)
 - id aliment (int)


### <span style="text-decoration: underline green;">19 - Une table horaire ouverture</span>

Contenant :
 - id (int auto-increment primary-key)
 - jour (int)
 - heure ouverture (date)
 - heure fermeture (date)