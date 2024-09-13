"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const chai_1 = require("chai");
// const request = require('request');
// const app = require('../index');
// const { expect } = require('chai');
// describe('API integration test', () => {
//   const app = 'http://localhost:7865';
describe('User API Tests', () => {
    it('should return a list of users', async () => {
        const res = await (0, supertest_1.default)(index_1.default).get('/apiv1//users');
        (0, chai_1.expect)(res.status).to.equal(200);
        (0, chai_1.expect)(res.body).to.be.an('array');
    });
    it('should return 404 for non-existent routes', async () => {
        const res = await (0, supertest_1.default)(index_1.default).get('/api/v1/non-existent-route');
        (0, chai_1.expect)(res.status).to.equal(404);
    });
});
//# sourceMappingURL=api.test.js.map