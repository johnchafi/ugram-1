# Documentation

## URL

``http://ugram-team02.s3-website.ca-central-1.amazonaws.com/``

## Connexion
Deux possibilités:

* Connexion via une combinaison email/mot de passe
* Connexion via OAuth2.0 via les services Google

## Création de compte

* Inscription manuelle via le formulaire
![Création de compte manuelle](./img/creation_compte_manuelle.png "Création de compte manuelle")


**ou**

* Inscription via OAUth2.0 via les services Google (génère un userId) 
![Création de compte google](./img/creation_compte_google.png "Création de compte Google")

## Home
Regroupe toutes les photos publiées ordonnées par dates (tous utilisateurs confondus) 

``http://ugram-team02.s3-website.ca-central-1.amazonaws.com/``


## Profil d'utilisateur
Permets d'afficher le profil d'un utilisateur spécifique
Sur ce profil est regroupé:
 
* Les informations de l'utilisateur

* Toutes les photos publiées par cet utilisateur  
 
``http://ugram-team02.s3-website.ca-central-1.amazonaws.com/profil/<nom_utilisateur>``

## Recherche
Possibilité de chercher par tag/identification/nom d'utilisateur

* Tags/Identifications:

![Recherche Tag Identification](./img/recherche_tag_identifications.png "Administration profil")


* Utilisateurs :

![Recherche Utilisateur](./img/recherche_utilisateur.png "Administration profil")


## Liste des utilisateurs

``http://ugram-team02.s3-website.ca-central-1.amazonaws.com/explore/``

## Image
Lorsqu'un utilisateur téléverse une image il est possible:
* D'ajouter une description
* D'ajouter des mots-clés
* D'identifier d'autres utilisateurs

## Réactions
Il est possible de réagir aux images via un système de like et de commentaire

* Like d'une image

![Picture_Like](./img/picture_like.png "Like une image")

* Commenter une image

![Picture_Comment](./img/picture_comment.png "Commenter une image")

* Consultation des réactions d'une image

![Picture_ReactShow](./img/picture_show_react.png "Afficher les réactions")

![Picture_CommentShow](./img/picture_comment_show.png "Afficher les commentaires")

## Administration réactions
Il est possible de retirer sa réaction (like ou commentaire) voir-ci dessous

* Suppression d'un like, il suffit de recliquer sur le bouton

![Picture_Delete_Like](./img/picture_delete_like.png "Delike une image")

* Suppression d'un commentaire

![Picture_Delete_Comment](./img/picture_delete_comment.png "Supprimer commentaire")

## Notifications
Les réactions des autres utilisateurs à vos images envoient des notifications

* Elles sont disponibles dans la barre de navigation

![Notifications](./img/notifications.png "Notifications")

## Administration

#### Administration du profil

Si l'utilisateur connecté consulte son profil il aura accès aux outils d'administration:
* Modifications des informations personnelles
![Administration Profil](./img/administration_profil.png "Administration profil")

* Administration de ses images
![Administrations toutes images](./img/administration_toutes_images.png "Administrations toutes images")

* Téléversement d'une image
![Téléversement Image](./img/televersement_image.png "Téléversement Image")



#### Administration d'une image
Si l'utilisateur connecté consulte une de ses images, il aura accès aux outils d'administration:

* Suppression de l'image
![Suppression Image](./img/suppression_image.png "Suppression Image")

* Gestion de la description, des mots-clés et des identifications:
![Administration Image](./img/administration_image.png "Administration Image")

#### Déconnexion et suppression du compte
Une fois dans le panel d'administration du profil, l'utisateur aura la possibilité de se déconnecter et de supprimer son compte

* Déconnexion

![Déconnexion du compte](./img/deconnexion_compte.png "Déconnexion compte")

* Suppression du compte

![Suppression du compte](./img/suppression_compte.png "Suppression compte")

#### Fonctionnalités additionnelles

* Recherche par mot-clé/description avec auto-complétion
 
![Filtre autocomplete](./img/filter_tag.png "Autocomplete search")

Il suffit de taper le mot-clé/la description dans la barre de recherche


* Mots-clés populaires

![Popular_tags](./img/popular_tags.png "Tag populaires")

Il suffit d'accéder à l'onglet exploration via la barre de navigation (voir image ci-dessus) et les tags les plus populaires s'affichent

* Filtres sur les photos au moment du téléversement

![Appliquer des filtres](./img/upload_filter.png "Filtre photo")

* Téléversement d'une image via webcam

![Prise de photo avec sa webcam](./img/upload_webcam.png "Photo avec webcam")


[Lien vers le rapport Google Analytics](./Analytics.pdf)


