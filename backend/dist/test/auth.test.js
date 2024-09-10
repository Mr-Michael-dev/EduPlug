"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const index_1 = __importDefault(require("../index")); // Ensure the app is properly exported
const cache_1 = require("../models/cache"); // Redis client
describe('Comprehensive API Tests', () => {
    // Test User Registration and Login
    describe('Authentication Tests', () => {
        it('should register a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(index_1.default).post('/api/users/register').send({
                fullname: 'Test User',
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });
            (0, chai_1.expect)(res.status).to.equal(201);
            (0, chai_1.expect)(res.body).to.have.property('token');
        }));
        it('should login a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(index_1.default).post('/api/users/login').send({
                email: 'test@example.com',
                password: 'password123',
            });
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.have.property('token');
        }));
    });
    // Additional tests (CRUD, validation, error handling, etc.) are handled similarly
    describe('Comprehensive API Tests', () => {
        // Test User Registration and Login
        describe('Authentication Tests', () => {
            it('should register a user', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(index_1.default).post('/api/users/register').send({
                    fullname: 'Test User',
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123',
                });
                (0, chai_1.expect)(res.status).to.equal(201);
                (0, chai_1.expect)(res.body).to.have.property('token');
            }));
            it('should login a user', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(index_1.default).post('/api/users/login').send({
                    email: 'test@example.com',
                    password: 'password123',
                });
                (0, chai_1.expect)(res.status).to.equal(200);
                (0, chai_1.expect)(res.body).to.have.property('token');
            }));
        });
        // Test API CRUD Operations (Create, Read, Update, Delete)
        describe('API CRUD Operations', () => {
            let token;
            let postId;
            before(() => __awaiter(void 0, void 0, void 0, function* () {
                // Login to get token
                const login = yield (0, supertest_1.default)(index_1.default).post('/api/users/login').send({
                    email: 'test@example.com',
                    password: 'password123',
                });
                token = login.body.token;
            }));
            it('should create a post', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(index_1.default)
                    .post('/api/posts')
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                    title: 'New Post',
                    content: 'This is a new post.',
                });
                (0, chai_1.expect)(res.status).to.equal(201);
                (0, chai_1.expect)(res.body).to.have.property('title', 'New Post');
                postId = res.body._id;
            }));
            it('should read a post', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(index_1.default).get(`/api/posts/${postId}`);
                (0, chai_1.expect)(res.status).to.equal(200);
                (0, chai_1.expect)(res.body).to.have.property('_id', postId);
            }));
            it('should update a post', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(index_1.default)
                    .put(`/api/posts/${postId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({ title: 'Updated Post' });
                (0, chai_1.expect)(res.status).to.equal(200);
                (0, chai_1.expect)(res.body).to.have.property('title', 'Updated Post');
            }));
            it('should delete a post', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(index_1.default)
                    .delete(`/api/posts/${postId}`)
                    .set('Authorization', `Bearer ${token}`);
                (0, chai_1.expect)(res.status).to.equal(200);
            }));
        });
        // Test Form Validation (e.g., empty fields or invalid inputs)
        describe('Form Validation Tests', () => {
            it('should return validation error for empty fields', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(index_1.default).post('/api/users/register').send({
                    fullname: '',
                    username: '',
                    email: 'invalidemail',
                    password: '',
                });
                (0, chai_1.expect)(res.status).to.equal(400);
                (0, chai_1.expect)(res.body).to.have.property('error');
            }));
        });
        // Test Database Interaction
        describe('Database Interaction Tests', () => {
            it('should interact with the database and retrieve users', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(index_1.default).get('/api/users');
                (0, chai_1.expect)(res.status).to.equal(200);
                (0, chai_1.expect)(res.body).to.be.an('array');
            }));
        });
        // Test Redis Cache Usage
        describe('Redis Cache Tests', () => {
            it('should cache and retrieve data from Redis', () => __awaiter(void 0, void 0, void 0, function* () {
                // First request (not cached)
                let res = yield (0, supertest_1.default)(index_1.default).get('/api/posts');
                (0, chai_1.expect)(res.status).to.equal(200);
                // Manually check Redis cache
                const cacheData = yield cache_1.client.get('/api/posts');
                (0, chai_1.expect)(cacheData).to.not.be.null;
                // Second request (should retrieve from cache)
                res = yield (0, supertest_1.default)(index_1.default).get('/api/posts');
                (0, chai_1.expect)(res.status).to.equal(200);
            }));
        });
        // Test Error Handling
        describe('Error Handling Tests', () => {
            it('should return 404 for non-existent routes', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(index_1.default).get('/api/non-existent-route');
                (0, chai_1.expect)(res.status).to.equal(404);
            }));
            it('should handle database errors gracefully', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(index_1.default).get('/api/posts/invalid-id');
                (0, chai_1.expect)(res.status).to.equal(400);
                (0, chai_1.expect)(res.body).to.have.property('error');
            }));
        });
        // Test Security Vulnerabilities (e.g., SQL/NoSQL injection)
        describe('Security Tests', () => {
            it('should prevent NoSQL injection', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(index_1.default).post('/api/users/login').send({
                    email: { $gt: '' }, // NoSQL injection attempt
                    password: 'password123',
                });
                (0, chai_1.expect)(res.status).to.equal(401);
            }));
        });
        // Test API Performance (Under Load)
        describe('API Performance Tests', () => {
            it('should handle multiple concurrent requests', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    this.timeout(5000); // Increase timeout to account for load testing
                    const requests = [];
                    for (let i = 0; i < 50; i++) {
                        requests.push((0, supertest_1.default)(index_1.default).get('/api/posts'));
                    }
                    const responses = yield Promise.all(requests);
                    responses.forEach((res) => {
                        (0, chai_1.expect)(res.status).to.equal(200);
                    });
                });
            });
        });
        // Test UI Rendering (Basic API response checks)
        describe('UI Rendering Tests', () => {
            it('should render correct response for /posts', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(index_1.default).get('/api/posts');
                (0, chai_1.expect)(res.status).to.equal(200);
                (0, chai_1.expect)(res.body).to.be.an('array');
            }));
        });
        // Test UI Responsiveness (Load-based response times)
        describe('UI Responsiveness Tests', () => {
            it('should return responses under a threshold', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    this.timeout(3000); // Set a time threshold for responsiveness
                    const start = Date.now();
                    const res = yield (0, supertest_1.default)(index_1.default).get('/api/posts');
                    const end = Date.now();
                    (0, chai_1.expect)(res.status).to.equal(200);
                    (0, chai_1.expect)(end - start).to.be.lessThan(1000); // Ensure response time is under 1 second
                });
            });
        });
    });
});
