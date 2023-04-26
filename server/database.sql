CREATE EXTENSION citext;
CREATE DOMAIN email AS citext
CHECK(
   VALUE ~ '^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$'
);

CREATE EXTENSION pgcrypto;

create TABLE person(
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(255),
    emailAdress email,
    token TEXT,
    password TEXT
);

create TABLE article(
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person(id)
);