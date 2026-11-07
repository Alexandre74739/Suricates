-- AlterTable
ALTER TABLE "Animation" ADD COLUMN     "alt" TEXT,
ADD COLUMN     "altEn" TEXT,
ADD COLUMN     "descriptionEn" TEXT,
ADD COLUMN     "titreEn" TEXT;

-- AlterTable
ALTER TABLE "Espece" ADD COLUMN     "nomEn" TEXT;

-- AlterTable
ALTER TABLE "Zone" ADD COLUMN     "nomEn" TEXT;
