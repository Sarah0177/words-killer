-- CreateTable
CREATE TABLE "Words" (
    "id" SERIAL NOT NULL,
    "content" TEXT,
    "isKilled" BOOLEAN NOT NULL DEFAULT false,
    "addAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastKillAt" TIMESTAMP(3),
    "killTimes" INTEGER,
    "degree" TEXT NOT NULL,

    CONSTRAINT "Words_pkey" PRIMARY KEY ("id")
);
