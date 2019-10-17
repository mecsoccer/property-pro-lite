# property-pro-lite


### Build Status

[![Build Status](https://travis-ci.com/mecsoccer/property-pro-lite.svg?branch=develop)](https://travis-ci.com/mecsoccer/property-pro-lite)
[![Coverage Status](https://coveralls.io/repos/github/mecsoccer/property-pro-lite/badge.svg?branch=develop)](https://coveralls.io/github/mecsoccer/property-pro-lite?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/97305bf35cc2c84c139b/maintainability)](https://codeclimate.com/github/mecsoccer/property-pro-lite/maintainability)


## Introduction
Property Pro Lite is a platform where people can create and/or search properties for sale or rent.

## Table of Contents

* [Link to hosted API backend](#Link-to-hosted-api-backend)
* [Link to UI Templates](#link-to-ui-templates)
* [Technologies Used](#technologies-used)
* [Testing Tools](#testing-tools)
* [Application Features](#application-features)
* [API Documentation](#api-documentation)
* [How to Run](#how-to-run)
* [How to Test](#how-to-test)
* [Author](#author)
* [License](#license) 


## Link to Hosted API backend

* [API link](https://serene-acadia-52622.herokuapp.com/api/v1)

## API Documentation

* [API doc](https://serene-acadia-52622.herokuapp.com/api-docs)


## Link to UI Templates

* UI [templates](https://mecsoccer.github.io/property-pro-lite/) are hosted on github pages


## Technologies Used

* [Nodejs](https://nodejs.org/en/)
* [Es6](https://es6.io/)
* [Express](https://expressjs.com)
* [JWT](https://www.npmjs.com/package/jsonwebtoken)
* [Babel](https://babeljs.io)
* [Eslint](https://eslint.org) (Airbnb--style guide)


## Testing Tools

* [Mocha](https://mochajs.org) - A javascript test framework
* [Chai](https://www.chaijs.com) - Assertion library
* [nyc](https://www.npmjs.com/package/nyc) - A reporting tool


## Application Features

* Agent can advertise a property advert
* Agent can update and delete a property advert
* Agent can sign in
* Agent can signup
* Client can sign up
* Client can sign in
* Client view property adverts
* Client can view property detail


## How to Run

```
# Clone this repository
$ git clone https://github.com/mecsoccer/Store-Manager.git

# Go into the repository
$ cd property-pro-lite

# Install dependencies
$ npm install

# Create .env file for environment variables in your root directory and paste the following
PORT=3000

note: you are free to use any port

# Run the app
$ npm start

your app should now be running at http://localhost:3000/api/v1.
```


## How to Test

```
# Clone this repository
$ git clone https://github.com/mecsoccer/property-pro-lite.git

# Go into the repository
$ cd property-pro-lite

# Install dependencies
$ npm install

# run test
$ npm run test
```


## Author
Jaachimma Onyenze


## License
MIT
