-- CreateEnum
CREATE TYPE "employee_role" AS ENUM ('ADMIN', 'SELLER');

-- CreateEnum
CREATE TYPE "employee_status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "customer_type" AS ENUM ('PERSON', 'COMPANY');

-- CreateTable
CREATE TABLE "company" (
    "id" UUID NOT NULL,
    "company_name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "employee_role" NOT NULL DEFAULT 'SELLER',
    "status" "employee_status" NOT NULL DEFAULT 'ACTIVE',
    "company_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" UUID NOT NULL,
    "type" "customer_type" NOT NULL DEFAULT 'PERSON',
    "document" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "observation" TEXT,
    "assigned_employee_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "main_contact" BOOLEAN NOT NULL DEFAULT false,
    "customer_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_email_key" ON "employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employee_company_id_id_key" ON "employee"("company_id", "id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_company_id_id_key" ON "customer"("company_id", "id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_company_id_document_key" ON "customer"("company_id", "document");

-- CreateIndex
CREATE UNIQUE INDEX "customer_company_id_email_key" ON "customer"("company_id", "email");

-- CreateIndex
CREATE INDEX "contact_company_id_customer_id_idx" ON "contact"("company_id", "customer_id");

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_company_id_assigned_employee_id_fkey" FOREIGN KEY ("company_id", "assigned_employee_id") REFERENCES "employee"("company_id", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_company_id_customer_id_fkey" FOREIGN KEY ("company_id", "customer_id") REFERENCES "customer"("company_id", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
