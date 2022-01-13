CREATE DATABASE "the_write_match";
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE writer (
    "id" SERIAL PRIMARY KEY,
    "name" character varying(250),
    "image" character varying(1000),
    "bio" character varying(1000),
    "wip" character varying(250),
    "contact" character varying(250),
    "genres" character varying(250),
    "user_id" int REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE skill (
    "id" SERIAL PRIMARY KEY,
    "skill" character varying(250)
);

INSERT INTO skill ( "skill" ) VALUES 
( 'developmental editing'),
('copy/line-editing'),
('accountability buddy'),
('critique group member'),
('manuscript swap'),
('world-building'),
('publishing strategy'),
('socializing/community')
);

CREATE TABLE writer_seeking (
    "id" SERIAL PRIMARY KEY,
    "writer_id" integer REFERENCES writer(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "seeking_id" integer REFERENCES skill(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE writer_available_for (
    "id" SERIAL PRIMARY KEY,
    "writer_id" integer REFERENCES writer(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "available_for_id" integer REFERENCES skill(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE matches (
    "id" SERIAL PRIMARY KEY,
    "initiator_id" integer REFERENCES writer(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "approver_id" integer REFERENCES writer(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "confirmed boolean"
);

