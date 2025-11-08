-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "maxClicks" INTEGER,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "lastAccessAt" TIMESTAMP(3),

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "links_slug_key" ON "links"("slug");
