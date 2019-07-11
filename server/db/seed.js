/* eslint-disable camelcase */
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import pool from './database';

dotenv.config();

function migrateUser(token, email, first_name, last_name, password,
  phoneNumber, address, is_admin) {
  const hash = bcrypt.hashSync(password, 10);
  const query = {
    text: 'INSERT INTO users(token, email, first_name, last_name, password, phoneNumber, address, is_admin) VALUES($1, $2, $3, $4, $5, $6, $7, $8);',
    values: [token, email, first_name, last_name, hash, phoneNumber, address, is_admin],
  };

  pool.query(query);
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

migrateUser('adakda-33302-dadldsd445', 'user1@email.com', 'joe', 'doe', 'doe-john',
  '08094232222', 'esiri close, ayobo, lagos state', false);
migrateUser('adakda-33302-tydldsd445', 'user2@email.com', 'joe', 'doe', 'john_doe',
  '08094232222', 'esiri close, ayobo, lagos state', false);
migrateUser('adakda-33302-dadldsd489', 'user3@email.com', 'joe', 'doe', 'doe',
  '08094232222', 'esiri close, ayobo, lagos state', false);
migrateUser('adakda-33302-dadldsd489', 'user4@email.com', 'joe', 'doe', 'j-doe',
  '08094232222', 'esiri close, ayobo, lagos state', false);

migrateProperty(1, 'available', '1000000.00', 'abia', 'umuahia', 'ubakala street',
  'bq', new Date(), 'https://img.com/img/house.png');
migrateProperty(1, 'available', '1000000.00', 'abia', 'umuahia', 'ubakala street',
  'bq', new Date(), 'https://img.com/img/house.png');
migrateProperty(1, 'sold', '1000000.00', 'enugu', 'enugu', 'new heaven',
  '3 bedroom', new Date(), 'https://img.com/img/house.png');
migrateProperty(4, 'sold', '1000000.00', 'enugu', 'enugu', 'new heaven',
  '3 bedroom', new Date(), 'https://img.com/img/house.png');
