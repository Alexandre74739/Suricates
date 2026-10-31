# CLAUDE.md — Le Domaine des Suricates

Application web de gestion d'un zoo fictif, **Le Domaine des Suricates** (parc animalier en Chartreuse), centré sur les suricates et leur environnement (Kalahari). Projet d'école en binôme (B3 développement web).

**Livrables :** MCD/MPD, export de la base de données, code de l'application.
**Contrainte à venir :** migration de la base vers Supabase (traitée plus tard — garder un schéma simple et des relations propres).

---

## Stack

| Couche | Choix |
| --- | --- |
| Framework | Nuxt (Vue 3) + TypeScript |
| Style | Tailwind CSS |
| Polices | `@nuxt/fonts` (Rubik Dirt, Lexend) |
| Base de données | PostgreSQL sur Neon |
| ORM | Prisma |
| Authentification | Neon Auth (email/mot de passe + Google) |
| Paiement | Stripe en **mode test uniquement** |
| Mails transactionnels | Brevo |

---

## Le produit en bref

- Le zoo est **payant**. Billet daté valable uniquement à la date choisie, réservable jusqu'à **12 mois** à l'avance.
- **Deux tarifs** : plein tarif (20 €, à partir de 13 ans) et réduit (12 €, de 3 à 12 ans et personnes en situation de handicap). Les prix sont **modifiables par l'admin**, seulement ces deux-là. En attendant le branchement de la table `Tarif`, ils sont codés en dur dans `shared/parc.ts`.
- **Moins de 3 ans : gratuit**, mais ils sont déclarés dans la commande et **comptent dans la jauge**. Ce n'est pas un troisième tarif.
- **Jauge journalière** fixée par l'admin. Les ventes en ligne et au guichet comptent dans la même jauge.
- **Aucun remboursement** (billet de loisir daté, exclu du droit de rétractation — art. L221-28 du Code de la consommation). À afficher dans les CGV et le mail.
- **Billet unique par commande** (ex. « 2 plein tarif + 1 réduit »), pas de billet nominatif, pas de nombre maximum.
- **Horaires** : 10 h – 17 h d'octobre à mars, 9 h 30 – 18 h 30 d'avril à juin et en septembre, 9 h 30 – 19 h 30 en juillet-août. Dernière entrée 1 h avant la fermeture.
- **Fermetures** : fermeture annuelle du 5 janvier au 6 février (repos des animaux), et les 1er janvier, 1er mai et 25 décembre. Les autres jours fériés sont ouverts.
- Horaires et fermeture annuelle **codés en dur** dans `shared/parc.ts`, pas en base. Les jours fériés fermés y seront ajoutés avec la billetterie.
- **Animations** : gratuites, en accès libre, **sans réservation**. Deux types : à horaire fixe quotidien (nourrissages) ou ponctuelles (show des suricates). Publiées directement par les employés du pôle animations ; l'admin peut tout modifier, retirer ou créer.
- **Animaux suivis par enclos** (espèce + effectif), jamais individuellement.

### Parcours d'achat

1. **En ligne** — compte obligatoire. Le client choisit date + quantités → Stripe Checkout → le webhook Stripe confirme → la commande passe en `PAYEE` → le billet + la facture partent par mail via Brevo.
2. **Au guichet** (caisse vente) — **sans compte**, aucune saisie de données client. L'agent choisit les quantités pour le jour même, encaisse (le moyen de paiement n'est pas enregistré), remet un bracelet. L'entrée est validée automatiquement.

### Entrée au parc (pas de QR code)

- **Caisse contrôle** pour les achats en ligne : l'agent cherche par numéro de commande ou nom, vérifie la date (et le justificatif du tarif réduit en cas de doute), remet le bracelet, clique « Valider l'entrée ».
- **Caisse vente** pour les achats sur place : entrée validée à l'achat.

---

## Rôles et droits

| Rôle | Pôle | Droits |
| --- | --- | --- |
| Visiteur non connecté | — | Site public, inscription, connexion |
| `CLIENT` | — | + paiement, Mes billets, Mon compte |
| `AGENT` | `ACCUEIL`, `SOINS` ou `ANIMATIONS` | Espace employé commun + pages de son pôle |
| `ADJOINT` | un pôle | Droits des agents de son pôle + pilotage du pôle (postes, tâches, suivi) |
| `ADMIN` | — | Accès à tout + administration |

- Tous les employés voient **l'équipe du jour** : qui est à quel poste et son état (disponible, occupé, en pause), tous pôles confondus.
- Le **rôle** et le **pôle** sont deux champs distincts. Le pôle est nul pour `CLIENT` et `ADMIN`.
- Les droits sont vérifiés **deux fois** : middleware de route Nuxt côté pages **et** contrôle dans chaque route API serveur. Ne jamais se fier au seul front.

---

## Arborescence des pages

```
pages/
├── index.vue                     Accueil                      tous
├── parc/index.vue, [id].vue      Le parc, fiche enclos        tous
├── animations.vue                Programme des animations     tous
├── billetterie/
│   ├── index.vue                 Tarifs, calendrier, quantités (paiement : client)
│   └── confirmation.vue          Confirmation de commande     client
├── infos-pratiques.vue                                        tous
├── connexion.vue, inscription.vue                             visiteur non connecté
├── legal/ (mentions-legales, cgv, confidentialite)            tous
├── compte/index.vue, billets.vue                              client
├── employe/
│   ├── index.vue                 Mon tableau de bord          tous les employés
│   ├── equipe.vue                Équipe du jour               tous les employés (affectations : adjoint, admin)
│   ├── accueil/ caisse, controle, frequentation               pôle accueil
│   ├── soins/ index, [id]                                     pôle soins
│   ├── animations/index.vue      Planning (tous) + création (pôle animations)
│   └── pole.vue                  Pilotage du pôle             adjoint, admin
└── admin/ index (dashboard), employes, billetterie, parc, animations, clients   admin
```

Middlewares : `auth` (connecté), `client`, `employe`, `pole` (vérifie le pôle selon le sous-dossier), `admin`.

---

## Base de données (Prisma)

Modèles et champs **en français** (cohérence avec le MCD). Code technique (fonctions, variables) en anglais.

| Modèle | Rôle |
| --- | --- |
| `Utilisateur` | `authId` (Neon Auth, unique), email, nom, prénom, `role`, `pole?`, `actif` |
| `Tarif` | `code` (`PLEIN`, `REDUIT`), `prixCentimes` — 2 lignes seulement |
| `Parametre` | `jaugeJournaliere` — ligne unique |
| `Commande` | `numero` (unique, ex. `SUR-2026-00412`), `utilisateurId?`, `canal` (`EN_LIGNE`, `GUICHET`), `dateVisite`, `nbPlein`, `nbReduit`, `nbGratuit` (moins de 3 ans), prix unitaires **copiés au moment de l'achat**, `totalCentimes`, `statut` (`EN_ATTENTE`, `PAYEE`, `EXPIREE`), `stripeSessionId?`, `venduParId?`, `entreeValideeLe?`, `entreeValideeParId?` |
| `Zone`, `Espece`, `Enclos` | Enclos = une espèce + effectif + état (`OUVERT`, `FERME`, `TRAVAUX`) |
| `Animation` | `type` (`FIXE`, `PONCTUELLE`), `heure` (si fixe), `dateHeure` (si ponctuelle), durée, `enclosId?`, `creeParId`, `active` |
| `Tache` | type (`SOIN`, `NOURRISSAGE`, `NETTOYAGE`, `ACCUEIL`, `ANIMATION`), `enclosId?`, `assigneeId`, `creeParId`, date prévue, statut, compte rendu |
| `AffectationPoste` | date, employé, pôle, poste, état (`DISPONIBLE`, `OCCUPE`, `PAUSE`) |
| `JournalAcces` | qui a consulté ou modifié quelle donnée sensible, et quand |

### Règles de données

- **Montants en centimes** (entiers), jamais en flottants.
- **Prix figés dans la commande** : un changement de tarif ne modifie jamais une commande existante.
- **Dates** stockées en UTC, affichées en `Europe/Paris`.
- **Jauge** : vérifiée côté serveur à la création de la session Stripe et à la vente au guichet (somme `nbPlein + nbReduit + nbGratuit` des commandes `PAYEE` de la date). Aucune vente possible un jour de fermeture.
- **Suppression** : un employé supprimé ne supprime pas l'historique (`onDelete: SetNull`). Préférer la désactivation (`actif = false`).
- Toute évolution du schéma passe par `prisma migrate dev` avec une migration nommée.

---

## Paiement et mails

- **Stripe Checkout** en mode test. Carte de démo : `4242 4242 4242 4242`, date future, CVC quelconque.
- La commande ne passe en `PAYEE` que via le **webhook** `checkout.session.completed`, avec vérification de signature. Jamais depuis la page de retour.
- Le webhook doit être **idempotent** (un même événement reçu deux fois ne crée pas deux mails).
- Après paiement, mail Brevo avec le billet en PDF et toutes les mentions légales : société fictive (SAS Le Domaine des Suricates, Chartreuse, SIRET et TVA fictifs signalés comme tels), numéro de commande, détail des tarifs, total TTC, absence de droit de rétractation, lien vers les CGV. TVA : à définir plus tard.
- En local : `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

---

## Sécurité et RGPD

- Collecter le **minimum** : aucune donnée client au guichet, aucune donnée de paiement stockée (Stripe s'en charge).
- Le dashboard admin affiche des **statistiques agrégées**. L'accès au détail d'un client est tracé dans `JournalAcces`.
- Le client peut **exporter** et **supprimer** ses données depuis Mon compte. À la suppression, les commandes sont conservées (obligation comptable) mais détachées du compte.
- Aucun secret dans le code : tout passe par `.env` et `runtimeConfig`.
- Valider toutes les entrées côté serveur (Zod recommandé).

---

## Design

Palette « Terrier et acacia » :

| Nom | Hex | Usage |
| --- | --- | --- |
| Sable clair | `#F2EBD9` | Fonds |
| Sauge | `#B7BE92` | Fonds secondaires, cartes |
| Vert acacia | `#4F6B3E` | Titres, couleur principale |
| Terracotta | `#C0663F` | Boutons d'action, accents |
| Galerie | `#26221D` | Texte |

- **Rubik Dirt** : titres et logo uniquement, jamais en petit.
- **Lexend** : tout le reste.
- Espace employé plus sobre que le site public : dominante sable et galerie, accents limités.
- Couleurs déclarées une seule fois dans la config Tailwind.

---

## Variables d'environnement

```
DATABASE_URL=
NEON_AUTH_...=            # selon la config Neon Auth
STRIPE_SECRET_KEY=        # clé test uniquement (sk_test_...)
STRIPE_WEBHOOK_SECRET=
BREVO_API_KEY=
MAIL_FROM=
```

---

## Commandes utiles

```
npm run dev                 # serveur de dev
npx prisma migrate dev      # appliquer / créer une migration
npx prisma studio           # explorer la base
npx prisma db seed          # données de démo
```

Le seed doit créer de quoi faire la démo en classe : un admin, un adjoint et un agent par pôle, des zones, des enclos, des animations fixes et ponctuelles, les deux tarifs et une jauge.

---

## Règles pour Claude

- Respecter ce cadrage. En cas de contradiction entre une demande et ce fichier, **le signaler** avant de coder.
- Toujours vérifier les droits côté serveur dans chaque route API, en plus du middleware de page.
- Ne jamais réintroduire : QR code, réservation d'animations, membres de famille, billets nominatifs, pass annuel, remboursements.
- Ne jamais utiliser de clé Stripe live.
- Interface en français. Textes courts, ton chaleureux.
- Avant d'ajouter une dépendance, vérifier qu'elle est nécessaire.

## Points ouverts

- Taux de TVA applicable.
- Migration vers Supabase.
