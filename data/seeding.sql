BEGIN;

DELETE FROM "role";
DELETE FROM "country";
DELETE FROM "visit";
DELETE FROM "user";
DELETE FROM "trip";
DELETE FROM "user_has_follower";

ALTER SEQUENCE role_id_seq RESTART WITH 1;
ALTER SEQUENCE trip_id_seq RESTART WITH 1;
ALTER SEQUENCE user_id_seq RESTART WITH 1;
ALTER SEQUENCE visit_id_seq RESTART WITH 1;
ALTER SEQUENCE country_id_seq RESTART WITH 1;

INSERT INTO "role" ("name")
VALUES
('User'),  
('Moderator');

INSERT INTO "country" ("name", "continent") 
VALUES
('France', 'Europe'), 
('Germany', 'Europe'), 
('Italy', 'Europe'), 
('Spain', 'Europe'), 
('Portugal', 'Europe'),
('Brazil', 'South America'), 
('Argentina', 'South America'), 
('Chile', 'South America'), 
('Peru', 'South America'), 
('Colombia', 'South America');

INSERT INTO "visit" ("city", "date_start", "date_end") 
VALUES
('Paris', '2024-01-01', '2024-01-10'), 
('Lyon', '2024-02-01', '2024-02-10'), 
('Marseille', '2024-03-01', '2024-03-10'), 
('Toulouse', '2024-04-01', '2024-04-10'), 
('Nice', '2024-05-01', '2024-05-10'),
('Berlin', '2024-06-01', '2024-06-10'), 
('Hamburg', '2024-07-01', '2024-07-10'),
('Munich', '2024-08-01', '2024-08-10'), 
('Cologne', '2024-09-01', '2024-09-10'), 
('Frankfurt', '2024-10-01', '2024-10-10');

INSERT INTO "user" ("email", "lastname", "firstname", "pseudo", "password", "role_id") 
VALUES
('user1@example.com', 'Doe', 'John', 'johndoe', 'password1', 1), 
('user2@example.com', 'Smith', 'Jane', 'janesmith', 'password2', 2), 
('user3@example.com', 'Brown', 'Bob', 'bobbrown', 'password3', 1), 
('user4@example.com', 'Davis', 'Alice', 'alicedavis', 'password4', 1), 
('user5@example.com', 'Miller', 'Charlie', 'charliemiller', 'password5', 1),
('user6@example.com', 'Wilson', 'Diana', 'dianawilson', 'password6', 1), 
('user7@example.com', 'Moore', 'Evan', 'evanmoore', 'password7', 1), 
('user8@example.com', 'Taylor', 'Fiona', 'fionataylor', 'password8', 1), 
('user9@example.com', 'Anderson', 'George', 'georgeanderson', 'password9', 1), 
('user10@example.com', 'Thomas', 'Hannah', 'hannahthomas', 'password10', 1);

INSERT INTO "trip" ("date_start", "date_end", "title", "user_id", "visit_id", "country_id") 
VALUES
('2024-01-01', '2024-01-10', 'Trip to Paris', 1, 1, 1), 
('2024-02-01', '2024-02-10', 'Trip to Lyon', 2, 2, 1), 
('2024-03-01', '2024-03-10', 'Trip to Marseille', 3, 3, 1), 
('2024-04-01', '2024-04-10', 'Trip to Toulouse', 4, 4, 1), 
('2024-05-01', '2024-05-10', 'Trip to Nice', 5, 5, 1),
('2024-06-01', '2024-06-10', 'Trip to Berlin', 6, 6, 2), 
('2024-07-01', '2024-07-10', 'Trip to Hamburg', 7, 7, 2), 
('2024-08-01', '2024-08-10', 'Trip to Munich', 8, 8, 2), 
('2024-09-01', '2024-09-10', 'Trip to Cologne', 9, 9, 2), 
('2024-10-01', '2024-10-10', 'Trip to Frankfurt', 10, 10, 2);

INSERT INTO "user_has_follower" ("user_id", "follower_id") 
VALUES
(1, 2),
(1, 3), 
(2, 1),
(2, 3),
(3, 1),
(3, 2),
(4, 5), 
(5, 4), 
(6, 7), 
(7, 6);

COMMIT;