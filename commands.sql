CREATE TABLE blogs (
  "id" serial PRIMARY KEY,
  "author" text,
  "url" text NOT NULL,
  "title" text NOT NULL,
  "like" smallint DEFAULT 0
);

INSERT INTO blogs ("author", "url", "title", "like")
VALUES ('Author 1', 'URL 1', 'Title 1', 0);

INSERT INTO blogs ("author", "url", "title", "like")
VALUES ('Author 2', 'URL 2', 'Title 2', 0);