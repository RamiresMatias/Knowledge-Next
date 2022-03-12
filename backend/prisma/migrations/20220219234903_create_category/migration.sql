-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pareintId" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_pareintId_fkey" FOREIGN KEY ("pareintId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
