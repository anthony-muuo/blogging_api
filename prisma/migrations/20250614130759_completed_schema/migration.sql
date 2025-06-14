-- CreateTable
CREATE TABLE "user_table" (
    "id" TEXT NOT NULL,
    "user_firstname" TEXT NOT NULL,
    "user_lastname" TEXT NOT NULL,
    "user_emailAddress" TEXT NOT NULL,
    "user_username" TEXT NOT NULL,

    CONSTRAINT "user_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_table" (
    "posts_id" TEXT NOT NULL,
    "posts_title" TEXT NOT NULL,
    "posts_content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "posts_deleted" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "posts_table_pkey" PRIMARY KEY ("posts_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_table_user_emailAddress_key" ON "user_table"("user_emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "user_table_user_username_key" ON "user_table"("user_username");

-- AddForeignKey
ALTER TABLE "posts_table" ADD CONSTRAINT "posts_table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_table"("id") ON DELETE CASCADE ON UPDATE CASCADE;
