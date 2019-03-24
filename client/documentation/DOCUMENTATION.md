# Documentation


## Connexion
Deux possibilités:

* Connexion via une combinaison email/mot de passe
* Connexion via OAuth2.0 via les services Google

## Création de compte

* Inscription manuelle via le formulaire
![Création de compte manuelle](./img/creation_compte_manuelle.png "Création de compte manuelle")


**ou**

* Inscription via OAUth2.0 via les services Google (gènère un userId) 
![Création de compte google](./img/creation_compte_google.png "Création de compte Google")

## Home
Regroupe toutes les photos publiées ordonnées par date (tout utilisateur confondu) 

``http://ugram-team02.s3-website.ca-central-1.amazonaws.com/``


## Profil d'utilisateur
Permet d'afficher le profil d'un utilisateur spécifiquue
Sur ce profil est regroupé:
 
* Les informations de l'utilisateur

* Toutes les photos publiées par cet utilisateur  
 
``http://ugram-team02.s3-website.ca-central-1.amazonaws.com/profil/<nom_utilisateur>``

## Recherche
Possibilité de chercher par tags/identification/nom d'utilisateur

* Tags/Identifications:

![Recherche Tag Identification](./img/recherche_tag_identifications.png "Administration profil")


* Utilisateurs :

![Recherche Utilisateur](./img/recherche_utilisateur.png "Administration profil")


## Liste des utilisateurs

``http://ugram-team02.s3-website.ca-central-1.amazonaws.com/users/``

## Image
Lorsqu'un utilisateur téléverse une image il est possible:
* D'ajouter une description
* D'ajouter des mots-clés
* D'identifier d'autres utilisateurs


## Administration

#### Administration du profil

Si l'utilisateur connecté consulte son profil il aura accès aux outils d'administration:
* Modifications des informations personnelles
![Administration Profil](./img/administration_profil.png "Administration profil")

* Administration de ses images
![Administrations toutes images](./img/administration_toutes_images.png "Administrations toutes images")

* Téléversement d'une image
![Téléversement Image](./img/televersement_image.png "Téleversement Image")



#### Administration d'une image
Si l'utilisateur connecté consulte une de ses images, il aura accès aux outils d'administration:

* Suppression de l'image
![Suppression Image](./img/suppression_image.png "Suppression Image")

* Gestion de la description, des mots-clés et des identifications:
![Administration Image](./img/administration_image.png "Administration Image")

#### Deconnexion et suppression du compte
Une fois dans le panel d'administration du profil, l'utisateur aura la possibilité de se déconnecter et de supprimer son compte

* Deconnexion
![Deconnexion du compte](./img/deconnexion_compte.png "Deconnexion compte")

* Suppression du compte
![Suppression du compte](./img/suppression_compte.png "Suppression compte")


