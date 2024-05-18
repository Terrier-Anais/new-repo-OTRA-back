-- Deploy oroad:seeding to pg

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
('2024-05-20', '2024-05-27', 'photo1.jpg', 'Voyage à Paris', 'Découverte de la ville lumière', 4, 1),
('2024-06-10', '2024-06-17', 'photo2.jpg', 'Voyage à Lyon', 'Découverte de la ville des lumières', 5, 2),
('2024-07-15', '2024-07-22', 'photo3.jpg', 'Voyage à Nice', 'Découverte de la ville de la promenade des anglais', 3, 3),
('2024-08-20', '2024-08-27', 'photo4.jpg', 'Voyage à Marseille', 'Découverte de la ville du vieux port', 4, 4),
('2024-09-10', '2024-09-17', 'photo5.jpg', 'Voyage à Bordeaux', 'Découverte de la ville du vin', 5, 5),
('2024-10-15', '2024-10-22', 'photo6.jpg', 'Voyage à Nantes', 'Découverte de la ville des machines', 3, 6),
('2024-11-20', '2024-11-27', 'photo7.jpg', 'Voyage à Strasbourg', 'Découverte de la ville de la cathédrale', 4, 7),
('2024-12-05', '2024-12-12', 'photo8.jpg', 'Escapade à Toulouse', 'Exploration de la ville rose', 5, 8),
('2025-01-20', '2025-01-27', 'photo9.jpg', 'Aventure à Lille', 'Immersion dans la capitale des Flandres', 4, 9),
('2025-02-15', '2025-02-22', 'photo10.jpg', 'Détente à Rennes', 'Découverte de la ville bretonne', 3, 10);

INSERT INTO "visit" ("dateStart", "dateEnd", "photo", "comment", "note", "place_id", "trip_id") VALUES
('2024-05-12', '2024-05-12', 'photo1.jpg', 'Commentaire sur la visite 1', 4, 1, 1),
('2024-05-12', '2024-05-12', 'photo2.jpg', 'Commentaire sur la visite 2', 5, 2, 2),
('2024-05-12', '2024-05-12', 'photo3.jpg', 'Commentaire sur la visite 3', 3, 3, 3),
('2024-05-12', '2024-05-12', 'photo4.jpg', 'Commentaire sur la visite 4', 2, 4, 1),
('2024-05-12', '2024-05-12', 'photo5.jpg', 'Commentaire sur la visite 5', 4, 5, 5),
('2024-05-12', '2024-05-12', 'photo6.jpg', 'Commentaire sur la visite 6', 5, 6, 1),
('2024-05-12', '2024-05-12', 'photo7.jpg', 'Commentaire sur la visite 7', 3, 7, 7),
('2024-05-12', '2024-05-12', 'photo8.jpg', 'Commentaire sur la visite 8', 2, 8, 2),
('2024-05-12', '2024-05-12', 'photo9.jpg', 'Commentaire sur la visite 9', 4, 9, 9),
('2024-05-12', '2024-05-12', 'photo10.jpg', 'Commentaire sur la visite 10', 5, 10, 10);



COMMIT

