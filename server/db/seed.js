/* eslint-disable camelcase */
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import pool from './database';

dotenv.config();

function migrateUser(email, first_name, last_name, password,
  phone_number, address, is_admin) {
  const hash = bcrypt.hashSync(password, 10);
  const query = {
    text: 'INSERT INTO users(email, first_name, last_name, password, phone_number, address, is_admin) VALUES($1, $2, $3, $4, $5, $6, $7);',
    values: [email, first_name, last_name, hash, phone_number, address, is_admin],
  };

  return pool.query(query);
}

function migrateProperty(
  owner, status, price, state, city, address, type, created_on, image_url,
) {
  const query = {
    text: 'INSERT INTO properties(owner, status, price, state, city, address, type, created_on, image_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    values: [owner, status, price, state, city, address, type, created_on, image_url],
  };

  pool.query(query);
}

async function seedUsers() {
  await migrateUser('user1@email.com', 'joe', 'doe', 'doe-john', '08094232222', 'esiri close, ayobo, lagos state', false);
  await migrateUser('user2@email.com', 'joe', 'doe', 'john_doe', '08094232222', 'esiri close, ayobo, lagos state', false);
  await migrateUser('user3@email.com', 'joe', 'doe', 'doe', '08094232222', 'esiri close, ayobo, lagos state', false);
  await migrateUser('user4@email.com', 'joe', 'doe', 'j-doe', '08094232222', 'esiri close, ayobo, lagos state', false);
}

seedUsers();

migrateProperty(1, 'available', '1000000.00', 'abia', 'umuahia', 'ubakala street',
  'bq', new Date(), 'https://img.com/img/house.png');
migrateProperty(1, 'available', '1000000.00', 'abia', 'umuahia', 'ubakala street',
  'bq', new Date(), 'https://img.com/img/house.png');
migrateProperty(1, 'sold', '1000000.00', 'enugu', 'enugu', 'new heaven',
  '3 bedroom', new Date(), 'https://img.com/img/house.png');
migrateProperty(1, 'sold', '1000000.00', 'enugu', 'enugu', 'new heaven',
  '3 bedroom', new Date(), 'https://img.com/img/house.png');
