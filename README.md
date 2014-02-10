## Gestion des projets de baccalauréat pour la spécialité ISN

L'outil isn-prj permet de gérer les dossiers de projet localement,
à l'aide d'une application xhtml/javascript/jquery

## Copyright

(c) 2014 Georges Khaznadar <georgesk@debian.org>

## Licence : GPL V3 ou plus.

Voir le fichier COPYING

## Installation

Il suffit de copier l'ensemble des fichiers dans un répertoire, et c'est
fonctionnel, sous réserve que les liens symboliques pointent vers les
bons emplacements.

Si vous utilisez un système De bian ou Ubuntu, ces liens symboliques 
fonctionnenent biensous réserve d'installer les paquets suivants :

  * <code>libjs-jquery</code>
  * <code>libjs-jquery-ui</code>

Dans tous les autres cas, assurez-vous en téléchargeant des versions récentes
de jquery et jquery-ui, que les fichiers nécessaires puissent être trouvés
sous les chemins suivants :

  * <code >jquery.js</code>
  * <code >jquery-ui.js</code>
  * <code >themes-smoothness-jquery-ui.css</code>

Notez bien que ces fichiers-là vont en inclure d'autres qui viennent lors
du téléchargement. Vous pouvez aussi modifier le début de la page index.html
afin de modifier les chemins vers les fichiers nécessaires, si cela est
plus facile dans votre cas.

## Mode d'emploi

<code>firefox index.html</code> Permet de lancer l'application.
Les boutons « Ouvrir » et « Enregistrer » en haut à droite de la page
permettent de gérer des fichiers de projets.

Notez bien : comme Firefox ne sait pas prévoir de nom de fichier a priori
pour une donnée récoltée dans un élément de page web, il est conseillé de
changer le nom de fichier (quelque chose qui se termine par <code>.part</code>
si on ne fait rien, par un nom de fichier avec l'extension <code>.json</code.

## BOGUES connues

Le modèle de sécurité des navigateurs web étant très strict, le fichier
à lire doit se situer le même répertoire de celui où réside le fichier
index.html