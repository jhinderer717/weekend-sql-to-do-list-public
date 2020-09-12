CREATE TABLE "tasks"
(
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR (256) NOT NULL,
    "completed" BOOLEAN
);

INSERT INTO "tasks"
    ("description", "completed")
VALUES
    ('Choke someone out at jiu-jitsu class', FALSE),
    ('Finish weekend homework', FALSE),
    ('Shoot sub 80 at St. Croix National Sunday morning', FALSE),
    ('Watch the Vikings beat the Packers', FALSE);