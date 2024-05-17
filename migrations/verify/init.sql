-- Verify oroad:init on pg

BEGIN;

SELECT * FROM "role" WHERE  False;  
SELECT * FROM "user" WHERE  False;
SELECT * FROM "place" WHERE  False;
SELECT * FROM "trip" WHERE  False;
SELECT * FROM "visit" WHERE  False;
SELECT * FROM "user_has_follower" WHERE  False;

ROLLBACK;
