# OC_P6
### *JustStreamIt*

---


# 1. Description du programme
Application web de streaming de films.

---


# 2. Créer l'environnement virtuel puis l'activer
#### Windows :
* Créer l'environnement virtuel avec la commande du terminal suivante : "python -m venv env".
* Activer l'environnement virutel depuis le terminal grâce à la commande suivante : "env/scripts/activate".
#### Unix :
* Créer l'environnement virtuel avec la commande du terminal suivante : "virtutalenv -p env venv".
* Activer l'environnement virutel depuis le terminal grâce à la commande suivante : "source env/bin/activate".

---


# 3. Installer et Initialiser le git
* Si vous n'avez pas encore git, cliquer sur le lien suivant : [Installer git](https://git-scm.com/downloads) et suivez les instructions du site.
* Initialiser ensuite le git avec la commande suivante dans votre console (assurez-vous que vous vous situez bien dans le dossier qui va contenir votre projet avant de lancer la commande): " *git init* " (Fonctionne pour Windows et Unix).

---


# 4. Importer le projet depuis github
Veuillez taper la commande suivante dans votre console : " *git clone https://github.com/GuillaumeP29/OC_P6.git* ".

---


# 5. Installation de l'api locale
* Rendez-vous sur le dépôt github suivant : " *https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR* ".
puis suivez les instructions du README.md.
* Renommer le dossier contenant l'api ("ocmovies-api-en-fr") en " *api* " puis positionnez-le dans le projet précédemment installé (dans le même dossier que le fichier page.html).

---


# 6. Lancer le programme
* Vous devez dans un premier temps mettre l'api en route, à l'aide de la commande suivant : " *python api/manage.py runserver* ".
* Il ne vous reste plus qu'à lancer le programme en ouvrant sur le fichier " *page.html* " à l'aide de votre navigateur.

---