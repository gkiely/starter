-- Connects to db

-- \c starter;
/*===================================
=            Table Setup            =
===================================*/
-- drop table if exists users cascade;
-- drop table if exists comments cascade;
-- drop table if exists posts cascade;
-- drop table if exists session;

-- CREATE TABLE users(
--   id bigserial primary key,
--   date_created timestamp default current_timestamp,
--   uname text,
--   email text,
--   password text,
--   salt text,
--   hash text,
--   data jsonb
-- );

-- CREATE OR REPLACE VIEW user_view AS
-- SELECT id, date_created, uname, email
-- FROM users;

-- CREATE TABLE posts(
--   id bigserial primary key,
--   date_created timestamp default current_timestamp,
--   title text,
--   description text,
--   status text,
--   user_id bigserial references users(id),
--   data jsonb
-- );

-- CREATE TABLE comments(
--   id bigserial primary key,
--   date_created timestamp default current_timestamp,
--   text text,
--   user_id bigserial references users(id),
--   post_id bigserial references posts(id),
--   data jsonb
-- );

-- CREATE OR REPLACE VIEW comment_view AS
-- select comments.id, comments.date_created, text, user_id, post_id, comments.data from comments, user_view
-- where comments.user_id = user_view.id
-- order by comments.id;

-- CREATE TABLE session (
--   "sid" varchar NOT NULL COLLATE "default",
--   "sess" json NOT NULL,
--   "expire" timestamp(6) NOT NULL
-- );
-- ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;



/**
 * Inserts
 */
-- insert into users (uname, email, password) 
-- values ('gkiely', 'grant.kiely@gmail.com', 'myPass') returning *;

/**
 * Selects
 */
-- select * from users;
-- select * from user_view;

/*=====  End of Table Setup  ======*/