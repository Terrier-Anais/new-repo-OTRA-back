-- Insertion de données pour la table 'role'
INSERT INTO "role" ("name") VALUES
('user'),
('moderateur');

-- Insertion de données pour la table 'user'
INSERT INTO "user" ("email", "lastname", "firstname", "pseudo", "password", "role_id") VALUES
('user1@example.com', 'Doe', 'John', 'johndoe1', 'password1', 1),
('user2@example.com', 'Smith', 'Anna', 'annasmith2', 'password2', 1),
('user3@example.com', 'Brown', 'James', 'jamesbrown3', 'password3', 1),
('user4@example.com', 'Davis', 'Maria', 'mariadavis4', 'password4', 1),
('user5@example.com', 'Miller', 'Robert', 'robertmiller5', 'password5', 1),
('user6@example.com', 'Wilson', 'Patricia', 'patriciawilson6', 'password6', 1),
('user7@example.com', 'Moore', 'Jennifer', 'jennifermoore7', 'password7', 1),
('user8@example.com', 'Taylor', 'Michael', 'michaeltaylor8', 'password8', 1),
('user9@example.com', 'Anderson', 'Linda', 'lindaanderson9', 'password9', 1),
('user10@example.com', 'Thomas', 'William', 'williamthomas10', 'password10', 1);

-- Insertion de données pour la table 'place'
INSERT INTO "place" ("city", "country", "continent") VALUES
('Paris', 'France', 'Europe'),
('Lyon', 'France', 'Europe'),
('Tokyo', 'Japan', 'Asia'),
('Kyoto', 'Japan', 'Asia'),
('New York', 'USA', 'North America'),
('Los Angeles', 'USA', 'North America'),
('London', 'UK', 'Europe'),
('Manchester', 'UK', 'Europe'),
('Madrid', 'Spain', 'Europe'),
('Barcelona', 'Spain', 'Europe');

-- Insertion de données pour la table 'trip'
-- Note: Les valeurs pour 'user_id' sont des exemples et doivent correspondre à des ID valides de la table 'user'.
INSERT INTO "trip" ("date_start", "date_end", "title", "user_id") VALUES
('2024-06-01', '2024-06-10', 'Voyage à Paris', 1),
('2024-07-01', '2024-07-10', 'Aventure à Lyon', 2),
('2024-08-01', '2024-08-10', 'Découverte de Tokyo', 3),
('2024-09-01', '2024-09-10', 'Exploration de Kyoto', 4),
('2024-10-01', '2024-10-10', 'Excursion à New York', 5),
('2024-11-01', '2024-11-10', 'Séjour à Los Angeles', 6),
('2024-12-01', '2024-12-10', 'Visite de Londres', 7),
('2025-01-01', '2025-01-10', 'Tour de Manchester', 8),
('2025-02-01', '2025-02-10', 'Vacances à Madrid', 9),
('2025-03-01', '2025-03-10', 'Retraite à Barcelone', 10);

-- Insertion de données pour la table 'visit'
-- Note: Les valeurs pour 'place_id' et 'trip_id' sont des exemples et doivent correspondre à des ID valides des tables 'place' et 'trip'.
INSERT INTO "visit" ("date_start", "date_end", "place_id", "trip_id") VALUES
('2024-06-01', '2024-06-02', 1, 1),
('2024-06-03', '2024-06-04', 2, 1),
('2024-07-01', '2024-07-02', 3, 2),
('2024-07-03', '2024-07-04', 4, 2),
('2024-08-01', '2024-08-02', 5, 3),
('2024-08-03', '2024-08-04', 6, 3),
('2024-09-01', '2024-09-02', 7, 4),
('2024-09-03', '2024-09-04', 8, 4),
('2024-10-01', '2024-10-02', 9, 5),
('2024-10-03', '2024-10-04', 10, 5);

-- Insertion de données pour la table 'user_has_follower'
-- Note: Les valeurs pour 'user_id' et 'follower_id' sont des exemples et doivent correspondre à des ID valides de la table 'user'.
INSERT INTO "user_has_follower" ("user_id", "follower_id") VALUES
(1, 2),
(1, 3),
(2, 1),
(2, 3),
(3, 1),
(3, 2),
(4, 5),
(4, 6),
(5, 4),
(5, 6);
