import request from 'supertest';
import app from '../index.js';
import { expect } from 'chai';
import redisClient from '../db/redis.js';
// Comprehensive API Tests
describe('Comprehensive API Tests', () => {
    // Authentication Tests
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
    // API CRUD Operations
    describe('API CRUD Operations', () => {
        let token;
        let postId;
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
                .send({ title: 'New Post', body: 'This is a new post.' });
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
    // Form Validation Tests
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
    // Redis Cache Tests
    describe('Redis Cache Tests', () => {
        it('should cache and retrieve data from Redis', async () => {
            let res = await request(app).get('/api/v1/posts');
            expect(res.status).to.equal(200);
            const cacheData = await redisClient.get('/api/v1/posts');
            expect(cacheData).to.not.be.null;
            res = await request(app).get('/api/v1/posts');
            expect(res.status).to.equal(200);
        });
    });
    // Security Tests
    describe('Security Tests', () => {
        it('should prevent NoSQL injection', async () => {
            const res = await request(app).post('/api/v1/users/login').send({
                email: { $gt: '' },
                password: 'password123',
            });
            expect(res.status).to.equal(401);
        });
    });
    // Error Handling Tests
    describe('Error Handling Tests', () => {
        it('should return 404 for non-existent routes', async () => {
            const res = await request(app).get('/api/v1/non-existent-route');
            expect(res.status).to.equal(404);
        });
        it('should handle database errors gracefully', async () => {
            const res = await request(app).get('/api/v1/posts/invalid-id');
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('error');
        });
    });
    // API Performance Tests
    describe('API Performance Tests', () => {
        it('should handle multiple concurrent requests', async function () {
            this.timeout(5000); // Increase timeout for load testing
            const requests = [];
            for (let i = 0; i < 50; i++) {
                requests.push(request(app).get('/api/v1/posts'));
            }
            const responses = await Promise.all(requests);
            responses.forEach((res) => {
                expect(res.status).to.equal(200);
            });
        });
    });
});
