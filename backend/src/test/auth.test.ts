import request from 'supertest';
import app from '../index';
import { expect } from 'chai';
import { client } from '../models/cache';
// const request = require('request');
// const app = require('../index'); // Ensure the path is correct
// const { client } = require('../models/cache'); // Redis client
// // import chai from 'chai';
// const { expect } = require('chai');

// describe('API integration test', () => {
//   const app = 'http://localhost:7865';

describe('Comprehensive API Tests', () => {

  describe('Authentication Tests', () => {
    it('should register a user', async () => {
      const res = await request(app).post('/api/v1/users/register').send({
        fullname: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('token');
    });

    it('should login a user', async () => {
      const res = await request(app).post('/api/v1/users/login').send({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
    });
  });

  describe('API CRUD Operations', () => {
    let token: string;
    let postId: string;

    before(async () => {
      const login = await request(app).post('/api/v1/users/login').send({
        email: 'test@example.com',
        password: 'password123',
      });
      token = login.body.token;
    });

    it('should create a post', async () => {
      const res = await request(app)
        .post('/api/v1/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'New Post',
          body: 'This is a new post.',
        });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('title', 'New Post');
      postId = res.body._id;
    });

    it('should read a post', async () => {
      const res = await request(app).get(`/api/v1/posts/${postId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id', postId);
    });

    it('should update a post', async () => {
      const res = await request(app)
        .put(`/api/v1/posts/${postId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Updated Post' });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('title', 'Updated Post');
    });

    it('should delete a post', async () => {
      const res = await request(app)
        .delete(`/api/v1/posts/${postId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
    });
  });

  describe('Form Validation Tests', () => {
    it('should return validation error for empty fields', async () => {
      const res = await request(app).post('/api/v1/users/register').send({
        fullname: '',
        username: '',
        email: 'invalidemail',
        password: '',
      });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
    });
  });

  describe('Redis Cache Tests', () => {
    it('should cache and retrieve data from Redis', async () => {
      let res = await request(app).get('/api/v1/posts');
      expect(res.status).to.equal(200);

      const cacheData = await client.get('/api/v1/posts');
      expect(cacheData).to.not.be.null;

      res = await request(app).get('/api/v1/posts');
      expect(res.status).to.equal(200);
    });
  });

  describe('Security Tests', () => {
    it('should prevent NoSQL injection', async () => {
      const res = await request(app).post('/api/v1/users/login').send({
        email: { $gt: '' },  // NoSQL injection attempt
        password: 'password123',
      });
      expect(res.status).to.equal(401);
    });
  });

  describe('Error Handling Tests', () => {
    it('should handle database errors gracefully', async () => {
      const res = await request(app).get('/api/v1/posts/invalid-id');
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
    });
  });
});
