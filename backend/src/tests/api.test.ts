import request from 'supertest';
import app from '../index.js';
import { expect } from 'chai';
import { client } from '../models/cache';
// const request = require('request');
// const app = require('../index');
// const { expect } = require('chai');

// describe('API integration test', () => {
//   const app = 'http://localhost:7865';

describe('User API Tests', () => {
  it('should return a list of users', async () => {
    const res = await request(app).get('/apiv1//users');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should return 404 for non-existent routes', async () => {
    const res = await request(app).get('/api/v1/non-existent-route');
    expect(res.status).to.equal(404);
  });
});

// import app from '../index.js'; // Adjust path as needed
// import request from 'supertest';

// describe('GET /api/v1/users', () => {
//   it('should return a list of users', async () => {
//     const response = await request(app).get('/api/v1/users');
//     expect(response.status).toBe(200);
//     expect(response.body).toBeInstanceOf(Array);
//   });
// });


describe('GET /api/v1/users', function() {
  it('should return a list of users', function(done) {
    request(app)
      .get('/api/v1/users')
      .expect(200)
      .end(function(err: any, res: any) {
        if (err) return done(err);
        // Add assertions here
        done();
      });
  });
});
