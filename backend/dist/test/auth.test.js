"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const chai_1 = require("chai");
const cache_1 = require("../models/cache");
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
            const res = await (0, supertest_1.default)(index_1.default).post('/api/v1/users/register').send({
                fullname: 'Test User',
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });
            (0, chai_1.expect)(res.status).to.equal(201);
            (0, chai_1.expect)(res.body).to.have.property('token');
        });
        it('should login a user', async () => {
            const res = await (0, supertest_1.default)(index_1.default).post('/api/v1/users/login').send({
                email: 'test@example.com',
                password: 'password123',
            });
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.have.property('token');
        });
    });
    describe('API CRUD Operations', () => {
        let token;
        let postId;
        before(async () => {
            const login = await (0, supertest_1.default)(index_1.default).post('/api/v1/users/login').send({
                email: 'test@example.com',
                password: 'password123',
            });
            token = login.body.token;
        });
        it('should create a post', async () => {
            const res = await (0, supertest_1.default)(index_1.default)
                .post('/api/v1/posts')
                .set('Authorization', `Bearer ${token}`)
                .send({
                title: 'New Post',
                body: 'This is a new post.',
            });
            (0, chai_1.expect)(res.status).to.equal(201);
            (0, chai_1.expect)(res.body).to.have.property('title', 'New Post');
            postId = res.body._id;
        });
        it('should read a post', async () => {
            const res = await (0, supertest_1.default)(index_1.default).get(`/api/v1/posts/${postId}`);
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.have.property('_id', postId);
        });
        it('should update a post', async () => {
            const res = await (0, supertest_1.default)(index_1.default)
                .put(`/api/v1/posts/${postId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ title: 'Updated Post' });
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.have.property('title', 'Updated Post');
        });
        it('should delete a post', async () => {
            const res = await (0, supertest_1.default)(index_1.default)
                .delete(`/api/v1/posts/${postId}`)
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(res.status).to.equal(200);
        });
    });
    describe('Form Validation Tests', () => {
        it('should return validation error for empty fields', async () => {
            const res = await (0, supertest_1.default)(index_1.default).post('/api/v1/users/register').send({
                fullname: '',
                username: '',
                email: 'invalidemail',
                password: '',
            });
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body).to.have.property('error');
        });
    });
    describe('Redis Cache Tests', () => {
        it('should cache and retrieve data from Redis', async () => {
            let res = await (0, supertest_1.default)(index_1.default).get('/api/v1/posts');
            (0, chai_1.expect)(res.status).to.equal(200);
            const cacheData = await cache_1.client.get('/api/v1/posts');
            (0, chai_1.expect)(cacheData).to.not.be.null;
            res = await (0, supertest_1.default)(index_1.default).get('/api/v1/posts');
            (0, chai_1.expect)(res.status).to.equal(200);
        });
    });
    describe('Security Tests', () => {
        it('should prevent NoSQL injection', async () => {
            const res = await (0, supertest_1.default)(index_1.default).post('/api/v1/users/login').send({
                email: { $gt: '' }, // NoSQL injection attempt
                password: 'password123',
            });
            (0, chai_1.expect)(res.status).to.equal(401);
        });
    });
    describe('Error Handling Tests', () => {
        it('should handle database errors gracefully', async () => {
            const res = await (0, supertest_1.default)(index_1.default).get('/api/v1/posts/invalid-id');
            (0, chai_1.expect)(res.status).to.equal(400);
            (0, chai_1.expect)(res.body).to.have.property('error');
        });
    });
});
//# sourceMappingURL=auth.test.js.map