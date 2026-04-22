# PodEduc - Intégration de vidéo

Plugin WordPress (non-officiel) ajoutant un bloc Gutenberg pour intégrer des vidéos hébergées sur [PodEduc](https://podeduc.apps.education.fr).

**Auteur :** Maxence LEBRUN  
**Version :** 1.3  
**Licence :** GPL-2.0-or-later  
**Dépôt :** https://github.com/mlebrun40/PodEducForWordPress

---

## Installation

1. Télécharger `podedu-video-block.zip`
2. Dans WordPress : **Extensions > Ajouter > Téléverser une extension**
3. Activer le plugin

## Utilisation

1. Dans l'éditeur Gutenberg, ajouter le bloc **Vidéo PodEduc** (catégorie *Incorporer*)
2. Coller l'URL de la vidéo (ex. `https://podeduc.apps.education.fr/video/12345-mon-titre/`)
3. Cliquer sur **Intégrer**
4. Régler le format (16:9, 4:3, 1:1) et le titre dans le panneau latéral

## Limitation connue

L'aperçu de la vidéo dans l'éditeur Gutenberg peut s'afficher en petit ou de manière incorrecte. Cela est dû à la façon dont Gutenberg gère les iframes dans son environnement d'édition.

**Cela n'affecte pas le rendu public du site** : la vidéo s'affiche correctement en plein format pour les visiteurs.

## Fonctionnement technique

Le bloc est dynamique : le HTML est généré côté serveur par `render.php` à chaque affichage de la page. L'iframe utilise le paramètre `?is_iframe=true` requis par PodEduc pour n'afficher que le lecteur vidéo.
