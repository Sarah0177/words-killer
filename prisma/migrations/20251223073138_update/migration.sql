-- AlterTable
ALTER TABLE "Words" ADD COLUMN     "needKillTimes" INTEGER DEFAULT 4,
ALTER COLUMN "killTimes" SET DEFAULT 0,
ALTER COLUMN "degree" SET DEFAULT 'easy';
