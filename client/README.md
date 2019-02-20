# Ugram-team2

Réalisation d'un "Instagram-like" réalisé en TypeScript et construit en React sous Redux

[Lien vers la documentation](./documentation/DOCUMENTATION.md)

## Démarrage

Ces instructions permettront de lancer le projet ugram-team2

### Pré-requis

Vérifiez que vous possèdez bien [npm](https://github.com/npm/cli) 

```
npm -v
```


### Installation

Cette étape télécharge les différentes dépendances nécessaires.

#### Windows
Pour pouvoir build native Node module sur Windows il faudra télécharger les [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools/blob/master/README.md).

```
npm install --global --productions windows-build-tools
```

#### Linux/ Mac
```
npm install
```


### Deploiement

```
npm start
```

## Fait avec

* [React](https://reactjs.org) - Framework front
* [Typescript](https://www.typescriptlang.org) - Typescript
* [Redux](https://redux.js.org) - Gestion des états

### Deploiement Automatique

* [Travis](https://travis-ci.com/) - Intégration continue

Travis s'occupe automatiquement de deployer sur le bucket s3 lorsque les tests unitaires sont correct.


## Auteur

* **Arthur Klein** 
* **Sébastien Bruere** 
* **Henri Longle** 
* **Maxime Leroy** 
