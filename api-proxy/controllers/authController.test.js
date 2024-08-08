//fetchData.test.js
const axios = require('axios');
const fetchData = require('./authController');
const request = require('supertest');
const app = require('../app');

jest.mock('axios');
describe('POST /login', () => {
  describe('given a valid username and password', () => {
    it('should return a 200 ', async () => {
      await request(app)
        .post('/login')
        .send({
          username: 'test',
          password: 'test',
        })
        .expect(200);
    });
  });

  describe('when password is not the right one', () => {
    it('should return a 401', async () => {
      await request(app)
        .post('/login')
        .send({
          username: 'test',
          password: 'wrongpassword',
        })
        .expect(401);
    });
  });

  describe('when username is missing', () => {
    it('should return a 400', async () => {
      await request(app)
        .post('/login')
        .send({
          password: 'test',
        })
        .expect(400);
    });
  });

  describe('when password is missing', () => {
    it('should return a 400', async () => {
      await request(app)
        .post('/login')
        .send({
          username: 'test',
        })
        .expect(400);
    });
  });

  describe('when both username and password are missing', () => {
    it('should return a 400', async () => {
      await request(app).post('/login').send({}).expect(400);
    });
  });
});

describe('POST /create-account', () => {
  describe('given false rights', () => {
    it('should return 403 FORBIDDEN by middleware', async () => {
      await request(app)
        .post('/create-account')
        .send({
          email: 'example@gmail.com',
          rights: ['chart'],
          adminUser: {
            email: 'admin@example.com',
            username: 'test',
            rights: ['chart'],
          },
        })
        .expect(403);
    });
  });
});
