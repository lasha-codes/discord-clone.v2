-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image_url" TEXT,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Server" (
    "id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "voice_channels" JSONB[],
    "text_channels" JSONB[],

    CONSTRAINT "Server_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MemberToServer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_MemberToServer_AB_unique" ON "_MemberToServer"("A", "B");

-- CreateIndex
CREATE INDEX "_MemberToServer_B_index" ON "_MemberToServer"("B");

-- AddForeignKey
ALTER TABLE "_MemberToServer" ADD CONSTRAINT "_MemberToServer_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToServer" ADD CONSTRAINT "_MemberToServer_B_fkey" FOREIGN KEY ("B") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;
