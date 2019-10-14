import pool from './database';

pool.query(`CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY NOT NULL, email TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL, last_name TEXT NOT NULL, password TEXT NOT NULL, phone_number TEXT NOT NULL, address TEXT NOT NULL,
    role TEXT NOT NULL)`);
pool.query(`CREATE TABLE IF NOT EXISTS properties(id SERIAL PRIMARY KEY NOT NULL, owner INTEGER NOT NULL,
    status TEXT NOT NULL, price NUMERIC(20,2) NOT NULL, state TEXT NOT NULL, city TEXT NOT NULL,
    address TEXT NOT NULL, type TEXT NOT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_url TEXT NOT NULL)`);

export default pool;
