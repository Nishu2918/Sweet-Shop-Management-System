const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/prisma');

let token;
afterAll(async () => {
  await prisma.$disconnect();
});

beforeAll(async () => {
  // create user + login
  const email = `sweet${Date.now()}@test.com`;
  const password = 'pass123';
  await request(app).post('/api/auth/register')
    .send({ name: 'SweetUser', email, password });
  const login = await request(app).post('/api/auth/login')
    .send({ email, password });
  token = login.body.token;
});

test('create and list sweets', async () => {
  const add = await request(app)
    .post('/api/sweets')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'TestSweet', category: 'Test', price: 10, quantity: 5 });
  expect(add.status).toBe(201);

  const list = await request(app)
    .get('/api/sweets');
  expect(list.status).toBe(200);
  expect(Array.isArray(list.body)).toBe(true);
  expect(list.body[0]).toHaveProperty('name');
});
