"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Users = {
  newValidUser: {
    id: 1,
    email: 'validuser1@email.com',
    first_name: 'joe',
    last_name: 'doe',
    password: 'adaDE##1123',
    phoneNumber: '08094232222',
    address: 'esiri close, ayobo, lagos state',
    is_admin: true
  },
  userInvalidEmail: {
    id: 2,
    email: 'user2email.com',
    first_name: 'joe',
    last_name: 'doe',
    password: 'adaDE##1123',
    phoneNumber: '08094232222',
    address: 'esiri close, ayobo, lagos state',
    is_admin: true
  },
  userInvalidFirstName: {
    id: 3,
    email: 'user3@email.com',
    first_name: 'joe3',
    last_name: 'doe',
    password: 'adaDE##1123',
    phoneNumber: '08094232222',
    address: 'esiri close, ayobo, lagos state',
    is_admin: true
  },
  userInvalidLastName: {
    id: 4,
    email: 'user4@email.com',
    first_name: 'joe',
    last_name: 'doe4',
    password: 'adaDE##1123',
    phoneNumber: '08094232222',
    address: 'esiri close, ayobo, lagos state',
    is_admin: true
  },
  userInvalidPassword: {
    id: 4,
    email: 'user4@email.com',
    first_name: 'joe',
    last_name: 'doe',
    password: '$jhh$Gy&gyYY#$YGIIY',
    phoneNumber: '08094232222',
    address: 'esiri close, ayobo, lagos state',
    is_admin: true
  },
  userInvalidPhone: {
    id: 4,
    email: 'user4@email.com',
    first_name: 'joe',
    last_name: 'doe',
    password: 'adaDE##1123',
    phoneNumber: '+a3489026435503',
    address: 'esiri close, ayobo, lagos state',
    is_admin: true
  },
  userInvalidAddress: {
    id: 4,
    email: 'user4@email.com',
    first_name: 'joe',
    last_name: 'doe',
    password: 'adaDE##1123',
    phoneNumber: '+23489026435503',
    address: '#$daa',
    is_admin: true
  },
  userInvalidIsAdmin: {
    id: 4,
    email: 'user4@email.com',
    first_name: 'joe',
    last_name: 'doe',
    password: 'adaDE##1123',
    phoneNumber: '+23489026435503',
    address: 'esiri close, ayobo, lagos state',
    is_admin: 'false'
  },
  correctSignin: {
    email: 'user1@email.com',
    password: 'doe-john'
  },
  wrongSignInPassword: {
    email: 'user1@email.com',
    password: 'adaDE##112343'
  },
  wrongSignInEmail: {
    email: 'wrong@email.com',
    password: 'adaDE##112343'
  },
  invalidSignInPassword: {
    email: 'user4@email.com',
    password: ''
  }
};
var _default = Users;
exports["default"] = _default;
//# sourceMappingURL=userData.js.map