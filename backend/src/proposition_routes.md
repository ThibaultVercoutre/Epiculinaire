# <span style="text-decoration: underline red;"> Proposition routes</span>

## <span style="text-decoration: underline green;"> Position des tables sur le plan interactif</span>

### <span style="text-decoration: underline;"> GET /tables :</span>

Récuperer le nombre de place, la position x et y et la rotation de chaque table.

### <span style="text-decoration: underline;"> GET /tablesdetails :</span>

Récuperer le nombre de place, la position x et y, la rotation de chaque table, les plats commandés, si le plat à été commandé ou pas et moment du repas.

### <span style="text-decoration: underline;"> GET /tablesdetails/:id :</span>

Récuperer le nombre de place, la position x et y, la rotation de chaque table, les plats commandés, s'il le plat à été commandé ou pas et moment du repas pour lequel un serveur est affecté.

### <span style="text-decoration: underline;"> GET /tablescommande :</span>

Récuperer le nombre de place, les plats commandés, heure, s'il le plat à été commandé ou pas et moment du repas, et quels cuisinier s'en occupe.

### <span style="text-decoration: underline;"> GET /tablesavancement :</span>

Recuperer l'avancement de toutes les tables (apéritif, entrée, plat, dessert, café, addition, etc.), et s'ils ont déjà commandé ou pas (en attente de service, servis)

## <span style="text-decoration: underline green;"> Afficher le stock </span>

### <span style="text-decoration: underline;"> GET /stock :</span>

Récuperer le nom de l'ingrédient, le type, la quantité et l'unité de chaque ingrédient.

### <span style="text-decoration: underline;"> POST /stock/:id/:valeur :</span>

Mettre à jour le stock d'un ingrédient (id) avec la valeur (valeur).

## <span style="text-decoration: underline green;"> Afficher les affectations des serveurs </span>

### <span style="text-decoration: underline;"> GET /serveursaffectation :</span>

Récuperer toutes les combinaises de serveurs et de leur(s) table(s) affecté(s) (avec id affectation, id serveur, nom serveur, id table, mission).

## <span style="text-decoration: underline green;"> Afficher les plats </span>

### <span style="text-decoration: underline;"> GET /plats :</span>

Récuperer tous les plats avec le nom et le type qui sont encore disponible par rapport au stock.

### <span style="text-decoration: underline;"> GET /platscommande :</span>

Récuperer tous les plats avec le nom, le prix, le type, et la date de la réservation qui a commandé le plat.

### <span style="text-decoration: underline;"> GET /platspreparation :</span>

Récuperer toutes les plats commandé, en train d'être fait et envoyé en salle avec avec le details des ingrédients étant fait.

### <span style="text-decoration: underline;"> GET /platspreparation/:id :</span>

Récuperer pour un plat en préparation, les ingrédients principaux avec quel cuisinier s'occupe de quel partie (Jean Eudes pour le steak, etc.).

### <span style="text-decoration: underline;"> GET /platsspecialite/:id :</span>

Récuperer les plats en preparation pour lequel le cuisinier est spécialisé (renseigné par l'id).

## <span style="text-decoration: underline green;"> Afficher les réservations </span>

### <span style="text-decoration: underline;"> GET /reservations :</span>

Récuperer toutes les réservations avec le nombre de personnes, la date et l'heure de la réservation, le nom de la table réservé et le nom de la personne ayant réservé.

## <span style="text-decoration: underline green;"> Proposition plat Chef </span>

### <span style="text-decoration: underline;"> GET /platsproposition :</span>

Récuperer tous les plats avec le nom, les ingrédients du plat proposés par le chef.

### <span style="text-decoration: underline;"> POST /platsproposition :</span>

Ajouter un plat avec le nom, les ingrédients du plat proposés par le chef.

## <span style="text-decoration: underline green;"> Afficher les aliments avec questions </span>

### <span style="text-decoration: underline;"> GET /aliments/:plat :</span>

Récuperer tous les aliments avec le nom du plat.

## <span style="text-decoration: underline green;"> Afficher les questions </span>

### <span style="text-decoration: underline;"> GET /questions/:aliments :</span>

Récuperer toutes les questions avec le nom de l'aliment.

## <span style="text-decoration: underline green;"> Afficher les réponses </span>

### <span style="text-decoration: underline;"> GET /reponses/:question :</span>

Récuperer toutes les réponses avec le nom de la question.

## <span style="text-decoration: underline green;"> Afficher les horaires ouverture </span>

### <span style="text-decoration: underline;"> GET /horairesouverture :</span>

Récuperer tous les horaires d'ouverture avec le jour, l'heure d'ouverture et l'heure de fermeture.