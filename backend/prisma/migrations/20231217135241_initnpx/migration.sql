-- CreateEnum
CREATE TYPE "Batch" AS ENUM ('AM_6_to_7AM', 'AM_7_to_8AM', 'AM_8_to_9AM', 'PM_5_to_6PM');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "age" INTEGER,
    "batch" "Batch",
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "paymentmonth" TEXT,
    "fk_user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pk_user_id" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pk_payment_id" ON "Payment"("id");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
