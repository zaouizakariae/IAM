# Projet : Découverte des principes de l’IAM

## Membres du projet
- AZAHAF Mohammed Reda
- LAKHMIRI Mohammed Elias
- MIENE Priscille
- NOISIER Alexandra
- ZAOUI Zakariae

---

## Contexte détaillé

### L'entreprise
Notre entreprise est une université.

### Profils et rôles identifiés
1. **Administrateurs (DSI)** : Gestion de l’infrastructure IT, des accès et des droits globaux.
2. **Ressources Humaines (RH)** : Gestion des données personnelles du personnel administratif et des enseignants.
3. **Direction** : Supervision globale, accès aux données stratégiques et aux rapports de performance.
4. **Maintenance** : Accès limité aux ressources techniques pour la gestion des systèmes physiques et numériques.
5. **Scolarité** : Gestion des données des étudiants (inscription, dossiers académiques, etc.).
6. **Étudiants** : Accès aux plateformes pédagogiques, aux résultats et aux ressources numériques.
7. **Professeurs** :
   - **Enseignants-chercheurs** : Accès aux outils pédagogiques, publications et ressources administratives.
   - **Externes** : Accès limité aux outils pédagogiques et à des ressources spécifiques selon leur mission.
   - **Visiteurs** : Accès restreint et temporaire.

### Données communes des utilisateurs
- Nom, prénom
- Date de naissance
- Adresse
- Adresse électronique
- Identifiant unique
- Mot de passe personnalisé

---

## Clarification des rôles et des permissions

### Rôles et leurs permissions

1. **Administrateurs (DSI)**
   - Créer, lire, mettre à jour et supprimer des utilisateurs.
   - Gérer les rôles et permissions.
   - Configurer et surveiller l’infrastructure IT.

2. **Ressources Humaines (RH)**
   - Lire et mettre à jour les données personnelles.
   - Générer des rapports RH.

3. **Direction**
   - Accéder aux données stratégiques et aux rapports.
   - Superviser les opérations globales.

4. **Maintenance**
   - Gérer les systèmes physiques et numériques.
   - Exécuter des scripts de maintenance.

5. **Scolarité**
   - Gérer les inscriptions des étudiants.
   - Accéder et mettre à jour les dossiers académiques.

6. **Étudiants**
   - Accéder aux plateformes pédagogiques.
   - Consulter les résultats et utiliser les ressources numériques.

7. **Professeurs (Enseignants-chercheurs)**
   - Accéder aux outils pédagogiques.
   - Publier des publications.
   - Gérer des ressources administratives.

8. **Externes**
   - Accès limité aux outils pédagogiques et ressources spécifiques.

9. **Visiteurs**
   - Accès temporaire et restreint.

### Corrélations entre les rôles
- **Administrateurs (DSI)** : supervisent les droits d’accès de tous les autres rôles.
- **RH et Direction** : partagent des données pour le suivi des salariés.
- **Professeurs et Étudiants** : collaborent sur les plateformes pédagogiques.
- **Visiteurs** : permissions isolées et interactions limitées.

---

## Définition des besoins

### Gestion des utilisateurs
- **Enregistrement** : Création de compte avec collecte des données personnelles minimum.
- **Authentification** : Connexion via identifiant unique et mot de passe.
- **Réinitialisation de mot de passe** : Vérification d’identité requise.
- **Cycle de vie** : Création, mise à jour, désactivation et suppression des comptes.

### Gestion des rôles et permissions
- **Création de rôles** : Définition de permissions spécifiques.
- **Gestion dynamique** : Modifier les rôles et permissions des utilisateurs.
- **Attribution automatique** : Automatisation selon des critères prédéfinis (département, groupe, etc.).

---

## Points à approfondir
- Schéma d’architecture du système IAM (composants et flux de données).
- Plan de sécurité :
  - Gestion des accès : principe du moindre privilège.
  - Protection des données : chiffrement des données en transit et au repos.
  - Conformité aux réglementations en vigueur.

---

## Authentification et autorisation

### Mécanismes d'authentification
Décrire les mécanismes possibles.

### Modèle d’autorisation
- RBAC : Role-Based Access Control.
- ABAC : Attribute-Based Access Control.

### Gestion des utilisateurs et des rôles
- Processus d'ajout, mise à jour, désactivation et suppression.
- Administration et modification des rôles et permissions.

---

## Gestion des politiques

### Politiques de mot de passe
- Longueur, complexité et expiration.

### Politiques d’accès
- Définition des règles selon les rôles et utilisateurs.

---

## Solution envisagée
Une solution open-source comme **OpenIAM**, offrant :
- Gestion des rôles et permissions.
- Fonctionnalités d’authentification multifactorielle.

---
