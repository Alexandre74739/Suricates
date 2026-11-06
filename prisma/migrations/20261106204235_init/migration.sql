-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'AGENT', 'ADJOINT', 'ADMIN');

-- CreateEnum
CREATE TYPE "Pole" AS ENUM ('ACCUEIL', 'SOINS', 'ANIMATIONS');

-- CreateEnum
CREATE TYPE "CodeTarif" AS ENUM ('PLEIN', 'REDUIT');

-- CreateEnum
CREATE TYPE "Canal" AS ENUM ('EN_LIGNE', 'GUICHET');

-- CreateEnum
CREATE TYPE "StatutCommande" AS ENUM ('EN_ATTENTE', 'PAYEE', 'EXPIREE');

-- CreateEnum
CREATE TYPE "EtatEnclos" AS ENUM ('OUVERT', 'FERME', 'TRAVAUX');

-- CreateEnum
CREATE TYPE "TypeAnimation" AS ENUM ('FIXE', 'PONCTUELLE');

-- CreateEnum
CREATE TYPE "TypeTache" AS ENUM ('SOIN', 'NOURRISSAGE', 'NETTOYAGE', 'ACCUEIL', 'ANIMATION');

-- CreateEnum
CREATE TYPE "StatutTache" AS ENUM ('A_FAIRE', 'EN_COURS', 'TERMINEE');

-- CreateEnum
CREATE TYPE "EtatPoste" AS ENUM ('DISPONIBLE', 'OCCUPE', 'PAUSE');

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "authId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "pole" "Pole",
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifieLe" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarif" (
    "id" SERIAL NOT NULL,
    "code" "CodeTarif" NOT NULL,
    "prixCentimes" INTEGER NOT NULL,
    "modifieLe" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tarif_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parametre" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "jaugeJournaliere" INTEGER NOT NULL,
    "modifieLe" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parametre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commande" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "canal" "Canal" NOT NULL,
    "dateVisite" DATE NOT NULL,
    "nbPlein" INTEGER NOT NULL DEFAULT 0,
    "nbReduit" INTEGER NOT NULL DEFAULT 0,
    "nbGratuit" INTEGER NOT NULL DEFAULT 0,
    "prixPleinCentimes" INTEGER NOT NULL,
    "prixReduitCentimes" INTEGER NOT NULL,
    "totalCentimes" INTEGER NOT NULL,
    "statut" "StatutCommande" NOT NULL DEFAULT 'EN_ATTENTE',
    "stripeSessionId" TEXT,
    "mailEnvoyeLe" TIMESTAMP(3),
    "entreeValideeLe" TIMESTAMP(3),
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "utilisateurId" INTEGER,
    "venduParId" INTEGER,
    "entreeValideeParId" INTEGER,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zone" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "couleur" TEXT NOT NULL,
    "image" TEXT,
    "ordre" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Zone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Espece" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Espece_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enclos" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "effectif" INTEGER NOT NULL DEFAULT 0,
    "etat" "EtatEnclos" NOT NULL DEFAULT 'OUVERT',
    "zoneId" INTEGER NOT NULL,
    "especeId" INTEGER NOT NULL,

    CONSTRAINT "Enclos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animation" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "type" "TypeAnimation" NOT NULL,
    "heure" TEXT,
    "dateHeure" TIMESTAMP(3),
    "dureeMinutes" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enclosId" INTEGER,
    "creeParId" INTEGER,

    CONSTRAINT "Animation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tache" (
    "id" SERIAL NOT NULL,
    "type" "TypeTache" NOT NULL,
    "datePrevue" TIMESTAMP(3) NOT NULL,
    "statut" "StatutTache" NOT NULL DEFAULT 'A_FAIRE',
    "compteRendu" TEXT,
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enclosId" INTEGER,
    "assigneeId" INTEGER,
    "creeParId" INTEGER,

    CONSTRAINT "Tache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AffectationPoste" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "pole" "Pole" NOT NULL,
    "poste" TEXT NOT NULL,
    "etat" "EtatPoste" NOT NULL DEFAULT 'DISPONIBLE',
    "employeId" INTEGER NOT NULL,

    CONSTRAINT "AffectationPoste_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalAcces" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "ressource" TEXT NOT NULL,
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "auteurId" INTEGER,
    "cibleId" INTEGER,

    CONSTRAINT "JournalAcces_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_authId_key" ON "Utilisateur"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tarif_code_key" ON "Tarif"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Commande_numero_key" ON "Commande"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Commande_stripeSessionId_key" ON "Commande"("stripeSessionId");

-- CreateIndex
CREATE INDEX "Commande_dateVisite_statut_idx" ON "Commande"("dateVisite", "statut");

-- CreateIndex
CREATE INDEX "Commande_utilisateurId_idx" ON "Commande"("utilisateurId");

-- CreateIndex
CREATE UNIQUE INDEX "Zone_slug_key" ON "Zone"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Espece_slug_key" ON "Espece"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Enclos_slug_key" ON "Enclos"("slug");

-- CreateIndex
CREATE INDEX "Enclos_zoneId_idx" ON "Enclos"("zoneId");

-- CreateIndex
CREATE UNIQUE INDEX "Animation_slug_key" ON "Animation"("slug");

-- CreateIndex
CREATE INDEX "Animation_type_active_idx" ON "Animation"("type", "active");

-- CreateIndex
CREATE INDEX "Tache_assigneeId_datePrevue_idx" ON "Tache"("assigneeId", "datePrevue");

-- CreateIndex
CREATE UNIQUE INDEX "AffectationPoste_date_employeId_key" ON "AffectationPoste"("date", "employeId");

-- CreateIndex
CREATE INDEX "JournalAcces_cibleId_idx" ON "JournalAcces"("cibleId");

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_venduParId_fkey" FOREIGN KEY ("venduParId") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_entreeValideeParId_fkey" FOREIGN KEY ("entreeValideeParId") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enclos" ADD CONSTRAINT "Enclos_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enclos" ADD CONSTRAINT "Enclos_especeId_fkey" FOREIGN KEY ("especeId") REFERENCES "Espece"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animation" ADD CONSTRAINT "Animation_enclosId_fkey" FOREIGN KEY ("enclosId") REFERENCES "Enclos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animation" ADD CONSTRAINT "Animation_creeParId_fkey" FOREIGN KEY ("creeParId") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tache" ADD CONSTRAINT "Tache_enclosId_fkey" FOREIGN KEY ("enclosId") REFERENCES "Enclos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tache" ADD CONSTRAINT "Tache_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tache" ADD CONSTRAINT "Tache_creeParId_fkey" FOREIGN KEY ("creeParId") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffectationPoste" ADD CONSTRAINT "AffectationPoste_employeId_fkey" FOREIGN KEY ("employeId") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalAcces" ADD CONSTRAINT "JournalAcces_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalAcces" ADD CONSTRAINT "JournalAcces_cibleId_fkey" FOREIGN KEY ("cibleId") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;
