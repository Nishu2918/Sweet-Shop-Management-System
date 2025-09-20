const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/prisma');

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Auth flow', () => {
  const email = `user${Date.now()}@test.com`;
  const password = 'pass123';

  test('register → login → token', async () => {
    const reg = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Tester', email, password });
    expect(reg.status).toBe(201);

    const login = await request(app)
      .post('/api/auth/login')
      .send({ email, password });
    expect(login.status).toBe(200);
    expect(login.body.token).toBeDefined();
  });
});
