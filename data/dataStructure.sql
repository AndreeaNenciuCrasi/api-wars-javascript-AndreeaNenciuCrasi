DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS planet_votes;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL
);

CREATE TABLE planet_votes (
    id SERIAL PRIMARY KEY,
    planet_id integer NOT NULL,
    planet_name varchar(255) NOT NULL,
    user_id integer references users(id),
    submission_time timestamp DEFAULT CURRENT_TIMESTAMP
);
--
-- INSERT INTO users VALUES (1, 'ana', 'sadfsdhfalksdhfsdjf');
-- INSERT INTO users VALUES (2, 'adnana', '11221341234134dhfsdjf');
--
-- INSERT INTO planet_votes VALUES (1, 12, 'star1', 1);
-- INSERT INTO planet_votes VALUES (2, 14, 'star2', 1);



