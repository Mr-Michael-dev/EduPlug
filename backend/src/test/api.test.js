// const request = require('supertest');
const app = require('../../dist/index'); // Adjust path as needed

// describe('GET /api/users', () => {
//   it('should return a list of users', async () => {
//     const response = await request(app).get('/api/users');
//     expect(response.status).toBe(200);
//     expect(response.body).toBeInstanceOf(Array);
//   });
// });


const request = require('supertest');


describe('GET /api/users', function() {
  it('should return a list of users', function(done) {
    request(app)
      .get('/api/users')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        // Add assertions here
        done();
      });
  });
});