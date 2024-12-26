
-- Drop tables
DROP TABLE IF EXISTS reply;
DROP TABLE IF EXISTS thread;
DROP TABLE IF EXISTS forum;

DROP TABLE IF EXISTS game_collection;

DROP TABLE IF EXISTS rsvp;
DROP TABLE IF EXISTS event;

DROP TABLE IF EXISTS game;

DROP TABLE IF EXISTS account;

-- Accounts
CREATE TABLE account (
	account_id SERIAL NOT NULL PRIMARY KEY,

	username TEXT NOT NULL,
	password_hash TEXT NOT NULL,

  email TEXT,
  address TEXT,

  bgg_account TEXT,

  role TEXT NOT NULL
);

-- Games
CREATE TABLE game (
	game_id SERIAL NOT NULL PRIMARY KEY,

	title TEXT NOT NULL,
  description TEXT NOT NULL,
  price decimal NOT NULL
);
CREATE TABLE game_collection (
  game_collection_id SERIAL NOT NULL PRIMARY KEY,

  account_id INT REFERENCES account(account_id) NOT NULL,
  game_id INT REFERENCES game(game_id) NOT NULL
);

-- Forums
CREATE TABLE forum (
	forum_id SERIAL NOT NULL PRIMARY KEY,

	title TEXT NOT NULL,
  description TEXT NOT NULL,

  type TEXT NOT NULL
);
CREATE TABLE thread (
	thread_id SERIAL NOT NULL PRIMARY KEY,

	title TEXT NOT NULL,
  content TEXT NOT NULL,

  account_id INT REFERENCES account(account_id) NOT NULL,
  forum_id INT REFERENCES forum(forum_id) NOT NULL
);
CREATE TABLE reply (
	reply_id SERIAL NOT NULL PRIMARY KEY,

  content TEXT NOT NULL,

  reply_to_thread_id INT REFERENCES thread(thread_id),
  reply_to_reply_id INT REFERENCES reply(reply_id),

  account_id INT REFERENCES account(account_id) NOT NULL
);

-- Events / meetups
CREATE TABLE event (
  event_id SERIAL NOT NULL PRIMARY KEY,

  title TEXT NOT NULL,
  content TEXT NOT NULL,

  status TEXT NOT NULL,

  date_created TIMESTAMP NOT NULL,
  date_meet TIMESTAMP NOT NULL,

  type TEXT NOT NULL,

  account_id INT REFERENCES account(account_id) NOT NULL,
  game_id INT REFERENCES game(game_id) NOT NULL
);
CREATE TABLE rsvp (
  rsvp_id SERIAL NOT NULL PRIMARY KEY,

  account_id INT REFERENCES account(account_id) NOT NULL,
  event_id INT REFERENCES event(event_id) NOT NULL
);

-- Sample data
INSERT INTO account (username, password_hash, role) VALUES ('admin', 'admin', 'admin');
INSERT INTO account (username, password_hash, role) VALUES ('test', 'test', 'user');