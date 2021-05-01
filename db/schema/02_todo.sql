-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS todo CASCADE;
CREATE TABLE todo (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  catagory TEXT,
  user_input TEXT,
  remind_me DATE,
  completed BOOLEAN DEFAULT FALSE
);
