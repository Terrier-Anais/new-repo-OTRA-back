-- Deploy oroad:init to pg

BEGIN; 

CREATE TABLE "role"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
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

CREATE TABLE "place"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "city" TEXT NOT NULL,
  "country" TEXT NOT NULL,
  "continent" TEXT NOT NULL,
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
   "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
   "updated_at" TIMESTAMPTZ
);

CREATE TABLE "visit"(
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "date_start"  DATE NOT NULL,
  "date_end"  DATE NOT NULL,
  "photo" TEXT,
  "comment" TEXT ,
  "note" INT,
  "place_id" INT NOT NULL REFERENCES "place"("id") ,
  "trip_id" INT NOT NULL REFERENCES "trip"("id") ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);


CREATE TABLE "user_has_follower"(
  "user_id" INT NOT NULL REFERENCES "user"("id"),
  "follower_id" INT NOT NULL REFERENCES "user"("id"),
  PRIMARY KEY ("user_id", "follower_id")
);

COMMIT;