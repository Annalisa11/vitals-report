//fetchData.test.js
const axios = require('axios');
const fetchData = require('./authController');
const request = require('supertest');
const app = require('../app');

describe('POST /login', () => {
  describe('given a valid username and password', () => {
    it('should return a 200 ', async () => {
      await request(app)
        .post('/login')
        .send({
          useername: 'test',
          password: 'test',
        })
        .expect(200);
    });
  });

  describe('when password is not the right one', () => {});
});
