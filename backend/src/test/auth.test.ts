import request from 'supertest';
import { expect } from 'chai';
import app from '../index'; // Ensure the app is properly exported
import { client } from '../models/cache'; // Redis client

describe('Comprehensive API Tests', () => {

  // Test User Registration and Login
  describe('Authentication Tests', () => {
    it('should register a user', async () => {
      const res = await request(app).post('/api/users/register').send({
        fullname: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('token');
    });

    it('should login a user', async () => {
      const res = await request(app).post('/api/users/login').send({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
    });
  });

  // Additional tests (CRUD, validation, error handling, etc.) are handled similarly

  describe('Comprehensive API Tests', () => {

    // Test User Registration and Login
    describe('Authentication Tests', () => {
      it('should register a user', async () => {
        const res = await request(app).post('/api/users/register').send({
          fullname: 'Test User',
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        });
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('token');
      });
  
      it('should login a user', async () => {
        const res = await request(app).post('/api/users/login').send({
          email: 'test@example.com',
          password: 'password123',
        });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('token');
      });
    });
  
    // Test API CRUD Operations (Create, Read, Update, Delete)
    describe('API CRUD Operations', () => {
      let token: string;
      let postId: string;
  
      before(async () => {
        // Login to get token
        const login = await request(app).post('/api/users/login').send({
          email: 'test@example.com',
          password: 'password123',
        });
        token = login.body.token;
      });
  
      it('should create a post', async () => {
        const res = await request(app)
          .post('/api/posts')
          .set('Authorization', `Bearer ${token}`)
          .send({
            title: 'New Post',
            content: 'This is a new post.',
          });
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('title', 'New Post');
        postId = res.body._id;
      });
  
      it('should read a post', async () => {
        const res = await request(app).get(`/api/posts/${postId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('_id', postId);
      });
  
      it('should update a post', async () => {
        const res = await request(app)
          .put(`/api/posts/${postId}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ title: 'Updated Post' });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('title', 'Updated Post');
      });
  
      it('should delete a post', async () => {
        const res = await request(app)
          .delete(`/api/posts/${postId}`)
          .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
      });
    });
  
    // Test Form Validation (e.g., empty fields or invalid inputs)
    describe('Form Validation Tests', () => {
      it('should return validation error for empty fields', async () => {
        const res = await request(app).post('/api/users/register').send({
          fullname: '',
          username: '',
          email: 'invalidemail',
          password: '',
        });
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
      });
    });
  
    // Test Database Interaction
    describe('Database Interaction Tests', () => {
      it('should interact with the database and retrieve users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
      });
    });
  
    // Test Redis Cache Usage
    describe('Redis Cache Tests', () => {
      it('should cache and retrieve data from Redis', async () => {
        // First request (not cached)
        let res = await request(app).get('/api/posts');
        expect(res.status).to.equal(200);
  
        // Manually check Redis cache
        const cacheData = await client.get('/api/posts');
        expect(cacheData).to.not.be.null;
  
        // Second request (should retrieve from cache)
        res = await request(app).get('/api/posts');
        expect(res.status).to.equal(200);
      });
    });
  
    // Test Error Handling
    describe('Error Handling Tests', () => {
      it('should return 404 for non-existent routes', async () => {
        const res = await request(app).get('/api/non-existent-route');
        expect(res.status).to.equal(404);
      });
  
      it('should handle database errors gracefully', async () => {
        const res = await request(app).get('/api/posts/invalid-id');
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
      });
    });
  
    // Test Security Vulnerabilities (e.g., SQL/NoSQL injection)
    describe('Security Tests', () => {
      it('should prevent NoSQL injection', async () => {
        const res = await request(app).post('/api/users/login').send({
          email: { $gt: '' },  // NoSQL injection attempt
          password: 'password123',
        });
        expect(res.status).to.equal(401);
      });
    });
  
    // Test API Performance (Under Load)
    describe('API Performance Tests', () => {
      it('should handle multiple concurrent requests', async function () {
        this.timeout(5000); // Increase timeout to account for load testing
  
        const requests = [];
        for (let i = 0; i < 50; i++) {
          requests.push(request(app).get('/api/posts'));
        }
  
        const responses = await Promise.all(requests);
        responses.forEach((res) => {
          expect(res.status).to.equal(200);
        });
      });
    });
  
    // Test UI Rendering (Basic API response checks)
    describe('UI Rendering Tests', () => {
      it('should render correct response for /posts', async () => {
        const res = await request(app).get('/api/posts');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
      });
    });
  
    // Test UI Responsiveness (Load-based response times)
    describe('UI Responsiveness Tests', () => {
      it('should return responses under a threshold', async function () {
        this.timeout(3000); // Set a time threshold for responsiveness
  
        const start = Date.now();
        const res = await request(app).get('/api/posts');
        const end = Date.now();
        expect(res.status).to.equal(200);
        expect(end - start).to.be.lessThan(1000);  // Ensure response time is under 1 second
      });
    });
  });
});