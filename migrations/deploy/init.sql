-- Deploy oroad:init to pg

BEGIN; 

CREATE TABLE "role"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "country"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "continent" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "visit"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "city" TEXT NOT NULL,
  "date_start"  DATE NOT NULL,
  "date_end"  DATE NOT NULL,
  "photo" TEXT,
  "comment" TEXT ,
  "note" INT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);


CREATE TABLE "user"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "lastname" TEXT NOT NULL,
  "firstname" TEXT NOT NULL,
  "pseudo" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "role_id" INT NOT NULL REFERENCES "role"("id") ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "trip"(
   "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "date_start"  DATE NOT NULL,
   "date_end"  DATE NOT NULL,
   "photo" TEXT ,
   "title" TEXT NOT NULL,
   "description" TEXT,
   "note" INT,
   "user_id" INT NOT NULL REFERENCES "user"("id") ,
   "city_id" INT NOT NULL REFERENCES "city"("id") ,
   "country_id" INT NOT NULL REFERENCES "country"("id") ,
   "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
   "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_has_follower"(
  "user_id" INT NOT NULL REFERENCES "user"("id"),
  "follower_id" INT NOT NULL REFERENCES "user"("id"),
  PRIMARY KEY ("user_id", "follower_id")
);


CREATE TABLE "trip_has_country"(
   "trip_id" INT NOT NULL REFERENCES "trip"("id") ,
   "country_id" INT NOT NULL REFERENCES "country"("id") 
);

CREATE TABLE "country_has_city"(
       "country_id" INT NOT NULL REFERENCES "country"("id") ,
       "visit_id" INT NOT NULL REFERENCES "visit"("id") 
);

COMMIT;
