# Ugram-team2

Réalisation d'une API "Instagram-like" en NodeJS

[Lien vers la documentation](http://ugram-team02.pm9h7ckh7u.us-east-2.elasticbeanstalk.com/)

## Démarrage

Ces instructions permettront de lancer le projet ugram-team2

### Pré-requis

Vérifiez bien que vous possédez [npm](https://github.com/npm/cli) 

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

## Déploiement

Lancer la commande:
```sh
npm start
```

## Tests unitaires

Lancer la commande:
```sh
npm test
```

Pour afficher la couverture de test en détails, lancer la commande:
```sh
npm run coverage
```

### Déploiement Automatique

* [Travis](https://travis-ci.com/) - Intégration continue

Travis s'occupe automatiquement de déployer sur le bucket s3 lorsque les tests unitaires sont corrects.

## Dépendances

* [express](http://expressjs.com/) - Framework back
* [Bookshelf](http://bookshelfjs.org/) - Communication base de données
* [Node Redis](http://redis.js.org/) - Communication avec Redis
* [Winston](https://github.com/lazywithclass/) - AWS Cloudwatch système de logs
* [AWS SDK](https://aws.amazon.com/sdk-for-node-js/) - SDK pour AWS
* [Mocha](https://mochajs.org/) - Tests unitaires
* [Chai](http://chaijs.com/) - Tests unitaires
* [Istanbul](http://gotwarlost.github.io/istanbul/) - Tests unitaires

## Auteur

* **Maxime Leroy**
* **Henri Longle**
* **Arthur Klein**
* **Sébastien Bruere**
