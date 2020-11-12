# Migration `20201112114059-adding-recipe-model`

This migration has been generated by Kellen Presta at 11/12/2020, 5:40:59 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Recipe" (
"id" SERIAL,
"analyzedInstructions" jsonb   ,
"servings" integer   NOT NULL ,
"cuisines" jsonb   ,
"diets" jsonb   ,
"dishTypes" jsonb   ,
"extendedIngredients" jsonb   NOT NULL ,
"imageURL" text   ,
"sourceURL" text   NOT NULL ,
"title" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."_RecipeToUser" (
"A" integer   NOT NULL ,
"B" integer   NOT NULL 
)

CREATE UNIQUE INDEX "Recipe.sourceURL_unique" ON "public"."Recipe"("sourceURL")

CREATE UNIQUE INDEX "_RecipeToUser_AB_unique" ON "public"."_RecipeToUser"("A", "B")

CREATE INDEX "_RecipeToUser_B_index" ON "public"."_RecipeToUser"("B")

ALTER TABLE "public"."_RecipeToUser" ADD FOREIGN KEY("A")REFERENCES "public"."Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_RecipeToUser" ADD FOREIGN KEY("B")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201110133643-1..20201112114059-adding-recipe-model
--- datamodel.dml
+++ datamodel.dml
@@ -3,19 +3,20 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model User {
-  id        Int     @id @default(autoincrement())
-  email     String  @unique
+  id        Int      @id @default(autoincrement())
+  email     String   @unique
   firstName String?
   lastName  String?
-  isAdmin   Boolean @default(false)
+  isAdmin   Boolean  @default(false)
   hash      String
   tokens    Token[]
+  recipes   Recipe[]
 }
 model Token {
   id         Int      @id @default(autoincrement())
@@ -27,8 +28,25 @@
   userId     Int
   user       User     @relation(fields: [userId], references: [id])
 }
+model Recipe {
+  id                   Int     @id @default(autoincrement())
+  analyzedInstructions Json?
+  servings             Int
+  cuisines             Json?
+  diets                Json?
+  dishTypes            Json?
+  extendedIngredients  Json
+  imageURL             String?
+  sourceURL            String  @unique
+  title                String
+  users                User[]
+
+
+
+}
+
 enum UserRole {
   STUDENT
   TEACHER
 }
```

