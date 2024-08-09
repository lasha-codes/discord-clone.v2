-- CreateTable
CREATE TABLE "Requests" (
    "id" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "reciever" TEXT NOT NULL,

    CONSTRAINT "Requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friends" (
    "id" TEXT NOT NULL,
    "first_user" TEXT NOT NULL,
    "second_user" TEXT NOT NULL,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("id")
);
