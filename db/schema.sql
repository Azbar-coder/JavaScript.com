BEGIN;

-- DROP TABLE articles;
CREATE TABLE articles (
  id         SERIAL PRIMARY KEY,
  title      TEXT NOT NULL,
  body       TEXT,
  url        TEXT,
  news       BOOLEAN NOT NULL DEFAULT FALSE,
  flagged    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT statement_timestamp()
);

-- DROP TABLE users
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  email      TEXT NOT NULL,
  optin      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT statement_timestamp()
);

-- DROP TABLE comments
CREATE TABLE comments (
  id          SERIAL PRIMARY KEY,
  article_id  INTEGER REFERENCES articles(id) NOT NULL,
  email       TEXT,
  username    TEXT,
  avatar_url  TEXT,
  body        TEXT,
  flagged     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMP DEFAULT statement_timestamp()
);

CREATE INDEX ON comments(article_id);

COMMIT;
