-- Deploy oroad:place_evolutions to pg

BEGIN;

ALTER TABLE "place" 
ADD COLUMN "country_latitude"  numeric(8,6),
ADD COLUMN "country_longitude" numeric(8,6),
ADD COLUMN "city_latitude"     numeric(8,6),
ADD COLUMN "city_longitude"    numeric(8,6);

COMMIT;

