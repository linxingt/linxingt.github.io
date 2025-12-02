# E-Portfolio de Xingtong
[Lien vers l'application déployée sur Vercel/Railway](https://xingtong.vercel.app/)

Ce dépôt contient le code source de mon portfolio professionnel. Il est conçu comme une application web complète (Full-Stack) pour présenter mes compétences, expériences et projets.

## Technologies et Architecture

Ce projet repose sur une architecture moderne utilisant MongoDB, Express, React et Node pour une performance optimale et une expérience utilisateur fluide.

| Rôle | Technologie | Hébergement |
| :--- | :--- | :--- |
| **Frontend** | **React** (avec **Vite**) | Vercel |
| **Backend** | **Node.js** / **Express** | Railway |
| **Base de Données** | **MongoDB Atlas** (NoSQL) | MongoDB Atlas |

### Structure du Dépôt

L'application est divisée en deux répertoires principaux : `client` (Frontend) et `server` (Backend).

* **`client/` (Frontend React)**
    * **Composants (JSX & SCSS):** Organisés par sections (`sections/`) et éléments UI réutilisables (`components/`).
    * **Pages (`pages/`):** Contient la logique d'affichage des vues principales (ex: `GuestbookPage`, `HomePage`).
    * **Styles (`Global.scss`):** Styles globaux de l'application.
* **`server/` (Backend Node/Express)**
    * **Controllers (`controllers/`):** Contient la logique métier pour chaque section (ex: `guestbookController.js`).
    * **Models/Schemas (`models/schemas/`):** Définit la structure des données MongoDB (ex: `GuestbookSchema.js`).
    * **Routes (`routes/`):** Définit les points d'accès API (ex: `guestbookRoutes.js`).
    * **Utils (`utils/`):** Services annexes comme la gestion des emails (`emailService.js`).

## Fonctionnalités Clés

* **Affichage Dynamique des Données :** Sections Expérience, Projets, Compétences et Loisirs gérées via la base de données.
* **Livre d'Or (Guestbook) Avancé :** Permet aux visiteurs de laisser des messages et d'y répondre.
* **Système de Sécurité Robuste :** Utilisation de `bcryptjs` pour le hachage des réponses de sécurité avant l'enregistrement.
* **Notification par Email :** Système d'envoi de notification vers l'administrateur Xingtong.

---

## Focus sur la Stabilité et la Sécurité (Guestbook)

Suite aux récents commits, la section **Livre d'Or** a bénéficié d'importantes améliorations en matière de qualité de données et de stabilité :

### 1. Nettoyage de Contenu (Qualité de Données)

* **Compression des Lignes Vides :** Les séquences de **trois sauts de ligne ou plus** consécutif sont compressées en un **deux saut de ligne** pour garantir une mise en page propre et éviter les lignes vides excessives.
    * *Implémentation :* Le contenu est nettoyé côté serveur via l'expression régulière `content.replace(/\s{3,}/g, '\n\n')`.

### 2. Protection contre XSS

* **Nettoyage HTML (DOMPurify) :** Le contenu est nettoyé avant l'enregistrement dans la base de données à l'aide de **DOMPurify** pour supprimer toute balise HTML potentiellement malveillante. Cette mesure protège le site contre les attaques de **Cross-Site Scripting (XSS)**.

---
🔗 [Version antérieure (Déc. 2022 - Janv. 2023)](https://linxingt.github.io/)