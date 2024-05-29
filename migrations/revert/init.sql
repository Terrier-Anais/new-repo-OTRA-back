-- Revert oroad:init from pg

BEGIN;

-- Suppression des tables
DROP TABLE IF EXISTS "visit_photos";
DROP TABLE IF EXISTS "visit";
DROP TABLE IF EXISTS "trip";
DROP TABLE IF EXISTS "place";
DROP TABLE IF EXISTS "user_has_follower";
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "role";

COMMIT;
