import app from '../index.js'; // Adjust path as needed
import request from 'supertest';
// describe('GET /api/v1/users', () => {
//   it('should return a list of users', async () => {
//     const response = await request(app).get('/api/v1/users');
//     expect(response.status).toBe(200);
//     expect(response.body).toBeInstanceOf(Array);
//   });
// });
describe('GET /api/v1/users', function () {
    it('should return a list of users', function (done) {
        request(app)
            .get('/api/v1/users')
            .expect(200)
            .end(function (err, res) {
            if (err)
                return done(err);
            // Add assertions here
            done();
        });
    });
});
