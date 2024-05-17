-- Revert oroad:place_evolutions from pg

BEGIN;

ALTER TABLE "place" 
DROP COLUMN IF EXISTS "country_latitude",
DROP COLUMN IF EXISTS "country_longitude",
DROP COLUMN IF EXISTS "city_latitude",
DROP COLUMN IF EXISTS "city_longitude";

COMMIT;

