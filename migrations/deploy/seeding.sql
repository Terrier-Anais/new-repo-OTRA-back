BEGIN;

-- Insertion des rôles 'member' et 'moderator'
INSERT INTO "role" ("name") VALUES ('member'), ('moderator');

-- Insertion de données dans la table "user"
INSERT INTO "user" ("email", "lastname", "firstname", "pseudo", "password", "role_id") VALUES
('alice@example.com', 'Liddell', 'Alice', 'alice', 'wonderland123', 1),
('bob@example.com', 'Builder', 'Bob', 'bob', 'buildit123', 2),
('carol@example.com', 'Singer', 'Carol', 'carol', 'songbird123', 1),
('dave@example.com', 'Smith', 'Dave', 'dave', 'hammer123', 2),
('eve@example.com', 'White', 'Eve', 'eve', 'apple123', 1),
('frank@example.com', 'Wright', 'Frank', 'frank', 'design123', 2),
('grace@example.com', 'Hopper', 'Grace', 'grace', 'code123', 1),
('henry@example.com', 'Ford', 'Henry', 'henry', 'drive123', 2),
('isabel@example.com', 'Queen', 'Isabel', 'isabel', 'crown123', 1),
('jack@example.com', 'Sparrow', 'Jack', 'jack', 'pirate123', 2);

-- Insertion de données dans la table "place"
INSERT INTO "place" ("city", "cityLatitude", "cityLongitude", "country", "countryLatitude", "countryLongitude", "continent") VALUES
('Paris', 48.8566, 2.3522, 'France', 46.2276, 2.2137, 'Europe'),
('Lyon', 45.7640, 4.8357, 'France', 46.2276, 2.2137, 'Europe'),
('Nice', 43.7102, 7.2620, 'France', 46.2276, 2.2137, 'Europe'),
('Marseille', 43.2965, 5.3698, 'France', 46.2276, 2.2137, 'Europe'),
('Bordeaux', 44.8378, -0.5792, 'France', 46.2276, 2.2137, 'Europe'),
('Nantes', 47.2184, -1.5536, 'France', 46.2276, 2.2137, 'Europe'),
('Strasbourg', 48.5734, 7.7521, 'France', 46.2276, 2.2137, 'Europe'),
('Toulouse', 43.6045, 1.4442, 'France', 46.2276, 2.2137, 'Europe'),
('Lille', 50.6292, 3.0573, 'France', 46.2276, 2.2137, 'Europe'),
('Rennes', 48.1173, -1.6778, 'France', 46.2276, 2.2137, 'Europe');

-- Insertion de données dans la table "trip"
INSERT INTO "trip" ("dateStart", "dateEnd", "photo", "title", "description", "note", "user_id") VALUES
('2020-05-20', '2024-05-27', 'photo1.jpg', 'Voyage à Paris', 'Découverte de la ville lumière', 4, 1),
('2020-06-10', '2024-06-17', 'photo2.jpg', 'Voyage à Lyon', 'Découverte de la ville des lumières', 5, 2),
('2020-07-15', '2024-07-22', 'photo3.jpg', 'Voyage à Nice', 'Découverte de la ville de la promenade des anglais', 3, 3),
('2023-08-20', '2024-08-27', 'photo4.jpg', 'Voyage à Marseille', 'Découverte de la ville du vieux port', 4, 4),
('2023-09-10', '2024-09-17', 'photo5.jpg', 'Voyage à Bordeaux', 'Découverte de la ville du vin', 5, 1),
('2022-10-15', '2024-10-22', 'photo6.jpg', 'Voyage à Nantes', 'Découverte de la ville des machines', 3, 3),
('2022-12-05', '2024-12-12', 'photo8.jpg', 'Escapade à Toulouse', 'Exploration de la ville rose', 5, 1),
('2021-01-20', '2025-01-27', 'photo9.jpg', 'Aventure à Lille', 'Immersion dans la capitale des Flandres', 4, 2),
('2021-02-15', '2025-02-22', 'photo10.jpg', 'Détente à Rennes', 'Découverte de la ville bretonne', 3, 2);

-- Insertion de données dans la table "visit"
INSERT INTO "visit" ("dateStart","dateEnd","photo","comment","note","place_id","trip_id") VALUES
('2022-05-20', '2024-05-27', 'photo1.jpg', 'Visite de la tour Eiffel', 4, 1, 1),
('2023-06-18','2023-06-25','photo11.jpg','Visite du musée du Louvre', 5, 1, 1),
('2020-07-08','2020-07-15','photo12.jpg','Promenade sur les Champs-Elysées', 3, 1, 1),
('2021-06-10', '2024-06-17', 'photo2.jpg', 'Visite du vieux Lyon', 5, 2, 2),
('2022-07-15', '2024-07-22', 'photo3.jpg', 'Promenade sur la promenade des anglais', 3, 3, 3),
('2022-08-20', '2024-08-27', 'photo4.jpg', 'Découverte du vieux port', 4, 4, 4),
('2021-09-10', '2024-09-17', 'photo5.jpg', 'Visite des vignobles bordelais', 5, 5, 5),
('2022-01-20', '2025-01-27', 'photo9.jpg', 'Balade dans le vieux Lille', 4, 9, 3),
('2022-02-15', '2025-02-22', 'photo10.jpg', 'Découverte du parc du Thabor', 3, 10, 1);

COMMIT;
