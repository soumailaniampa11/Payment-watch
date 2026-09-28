# Cahier des charges — MVP d’outil de veille stratégique automatisée

## Secteur : paiement multicanal, fintech et concurrence bancaire au Maroc

## 1. Contexte

Je suis Business Developer à **Attijariwafa Bank**, avec un focus sur le **paiement multicanal**.
J’ai besoin d’un outil de veille automatisée pour suivre en continu les évolutions de l’écosystème du paiement et de la fintech au Maroc.

L’objectif est de remplacer une veille manuelle dispersée par un système capable de :

* collecter automatiquement les informations pertinentes,
* analyser leur intérêt stratégique,
* détecter les opportunités et menaces,
* suivre les initiatives des **banques concurrentes**,
* produire une synthèse exploitable rapidement.

Ce projet doit être conçu comme un **MVP fonctionnel mais déjà puissant**, sans complexifier inutilement l’architecture.

---

## 2. Objectif principal

Construire un outil de veille automatisée qui permet de surveiller :

* l’écosystème du **paiement multicanal** au Maroc,
* les **fintechs** et nouveaux entrants,
* les **évolutions réglementaires**,
* les projets de **digitalisation du secteur public et parapublic**,
* les innovations liées aux paiements,
* les annonces, lancements, partenariats et initiatives des **banques concurrentes**.

L’outil doit être capable de sortir des informations utiles pour une lecture **business et stratégique**, pas seulement des résumés d’articles.

---

## 3. Axes de veille à couvrir

### 3.1 Veille concurrentielle bancaire

L’outil doit suivre les initiatives des banques concurrentes au Maroc, notamment :

* nouvelles offres de paiement,
* wallets, applications, paiement mobile, QR code,
* acquisition commerçants,
* encaissement digital,
* partenariats fintech,
* digitalisation des parcours clients,
* innovations sur cartes, mobile banking et e-commerce,
* actions sur les paiements marchands, institutionnels ou omnicanaux.

Le système doit considérer comme concurrents prioritaires :

* banques marocaines concurrentes d’Attijariwafa Bank,
* filiales ou marques digitales associées,
* acteurs bancaires très actifs sur le paiement.

---

### 3.2 Veille fintech

Surveiller :

* startups fintech,
* nouveaux PSP / agrégateurs / wallets,
* partenariats,
* levées de fonds,
* lancements de produits,
* évolution de l’écosystème paiement.

---

### 3.3 Veille réglementaire

Surveiller :

* Bank Al-Maghrib,
* régulateurs,
* circulaires,
* communiqués,
* cadres relatifs aux paiements, fintech, digitalisation financière, interopérabilité, sécurité, conformité.

---

### 3.4 Veille institutionnelle et gouvernementale

Suivre les projets de digitalisation liés à :

* administrations publiques,
* services de paiement gouvernementaux,
* programmes de modernisation,
* appels à projets ou initiatives numériques,
* inclusion financière et digitalisation des services publics.

---

### 3.5 Veille marché / innovation

Surveiller :

* QR code,
* wallet,
* mobile payment,
* e-commerce payment,
* BNPL si pertinent,
* acceptance / merchant acquiring,
* paiement omnicanal,
* embedded finance,
* open banking si cela touche le paiement,
* nouvelles habitudes clients.

---

## 4. Résultat attendu

L’outil doit répondre à cette logique :

> “Quelles sont les nouveautés importantes dans le paiement et la fintech au Maroc, qui peuvent représenter une opportunité, une menace, une inspiration ou un signal à suivre pour Attijariwafa Bank ?”

---

## 5. Périmètre fonctionnel du MVP

## 5.1 Collecte automatique de l’information

Le système doit pouvoir récupérer des contenus depuis :

* flux RSS,
* sites d’actualité économique,
* sites institutionnels,
* sites des banques concurrentes,
* sites ou blogs fintech,
* autres sources web identifiées comme stratégiques.

Le système doit être pensé pour permettre l’ajout facile de nouvelles sources plus tard.

---

## 5.2 Analyse automatique des contenus

Chaque contenu récupéré doit être analysé automatiquement via OpenAI afin d’obtenir une sortie structurée.

Pour chaque information, le système doit produire :

* **titre**
* **source**
* **date**
* **lien**
* **résumé court**
* **catégorie principale**
* **type de signal**
* **acteurs cités**
* **niveau d’importance**
* **impact potentiel pour Attijariwafa Bank**
* **opportunité détectée**
* **menace détectée**
* **action ou piste recommandée**

---

## 5.3 Classification attendue

Chaque information doit être classée dans une catégorie, par exemple :

* Paiement multicanal
* Banque concurrente
* Fintech
* Régulation
* Gouvernement / secteur public
* Innovation
* Partenariat
* Nouveau produit / nouveau service

Une même information peut avoir une catégorie principale et éventuellement une catégorie secondaire.

---

## 5.4 Détection métier

Le système ne doit pas seulement résumer.
Il doit aussi détecter la nature stratégique du signal, par exemple :

* lancement d’un produit,
* annonce d’un partenariat,
* arrivée d’un nouvel acteur,
* évolution réglementaire,
* initiative concurrente,
* digitalisation d’un secteur,
* opportunité potentielle pour la banque,
* menace concurrentielle,
* tendance émergente.

---

## 5.5 Priorisation

Le MVP doit intégrer une logique simple mais utile de priorisation.

Chaque information doit être notée ou classée selon :

* **faible**
* **moyenne**
* **élevée**

Cette importance doit dépendre de critères comme :

* lien direct avec le paiement,
* lien avec le marché marocain,
* implication d’une banque concurrente,
* nouveauté de l’information,
* impact potentiel business,
* intérêt stratégique pour Attijariwafa Bank.

---

## 6. Outil de stockage pour le MVP

Pour le MVP, le stockage se fera dans **Google Sheets**.

Le système doit alimenter automatiquement une feuille Google Sheets avec des colonnes structurées.

### Colonnes recommandées

* Date de collecte
* Titre
* Source
* Lien
* Résumé
* Catégorie
* Sous-catégorie
* Type de signal
* Acteurs cités
* Banque concurrente concernée
* Importance
* Opportunité
* Menace
* Impact pour Attijariwafa Bank
* Action recommandée
* Statut de lecture / traitement

---

## 7. Diffusion des résultats

Le système doit produire un format facilement lisible.

### 7.1 Sortie principale

Alimentation continue de Google Sheets.

### 7.2 Sortie secondaire

Possibilité de générer un **digest synthétique**, par exemple :

* top 5 des signaux du jour,
* top opportunités,
* top menaces,
* principales initiatives concurrentes.

Le digest peut être préparé pour un affichage simple ou un envoi ultérieur.

---

## 8. Stack technique à utiliser

Le MVP doit être construit avec :

* **n8n** comme moteur principal d’automatisation
* **OpenAI API** pour l’analyse et la classification
* **Google Sheets** pour le stockage et le suivi
* **VS Code / Claude Code** pour l’assistance au développement

---

## 9. Contraintes et principes de conception

Le système doit être :

* simple à lancer,
* modulaire,
* évolutif,
* lisible,
* facile à maintenir,
* assez robuste pour un usage professionnel,
* suffisamment intelligent pour filtrer le bruit.

Le MVP ne doit pas chercher à tout faire.
Il doit d’abord bien faire les fonctions essentielles.

---

## 10. Ce que le MVP doit absolument bien faire

Les points les plus importants sont :

* surveiller les bonnes sources,
* bien identifier les **banques concurrentes**,
* bien reconnaître ce qui touche au **paiement multicanal**,
* distinguer une simple actualité d’un **signal stratégique**,
* produire une lecture orientée **business bancaire**,
* stocker proprement les résultats dans Google Sheets.

---

## 11. Sources prioritaires à prévoir

Le système doit être conçu pour accueillir des sources comme :

* banques marocaines concurrentes,
* Bank Al-Maghrib,
* médias économiques marocains,
* fintechs locales,
* institutions publiques,
* acteurs du paiement,
* presse spécialisée business / tech / finance.

La liste exacte pourra être enrichie progressivement.

---

## 12. Logique métier attendue dans l’analyse IA

L’analyse ne doit pas être générique.
Elle doit répondre à des questions comme :

* Est-ce important pour Attijariwafa Bank ?
* Est-ce une opportunité de partenariat ou de positionnement ?
* Est-ce une menace concurrentielle ?
* Est-ce un signal faible à suivre ?
* Est-ce lié à la digitalisation des paiements au Maroc ?
* Est-ce qu’un concurrent prend de l’avance sur un sujet clé ?

---

## 13. Livrables attendus

Le développement doit produire :

* un workflow n8n fonctionnel,
* un mécanisme de collecte de sources,
* une étape d’analyse OpenAI,
* une écriture propre dans Google Sheets,
* une logique de classification et de priorisation,
* une documentation simple expliquant comment ajouter une source ou ajuster les critères.

---

## 14. Vision d’évolution après le MVP

Une fois le MVP validé, des évolutions pourront être envisagées :

* scoring plus avancé,
* dashboard,
* enrichissement des sources,
* détection de tendances,
* synthèse hebdomadaire,
* ajout d’une couche plus avancée type agent / LangGraph si nécessaire.

---

## 15. Résumé exécutif

Le projet consiste à construire un **MVP de veille stratégique automatisée** pour **Attijariwafa Bank**, centré sur :

* le paiement multicanal,
* la fintech,
* la régulation,
* la digitalisation,
* et surtout la **veille des banques concurrentes au Maroc**.

Le système doit utiliser **n8n + OpenAI + Google Sheets**, avec une logique suffisamment intelligente pour faire remonter des informations à forte valeur métier, sans complexité technique excessive.
