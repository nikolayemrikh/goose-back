-- CreateTable
CREATE TABLE "public"."game" (
    "id" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL,
    "startAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tap" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL,
    "gameId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "tap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."game" ADD CONSTRAINT "game_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tap" ADD CONSTRAINT "tap_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tap" ADD CONSTRAINT "tap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
