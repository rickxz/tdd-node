const request = require('supertest');

const app = require('../../src/app');
const truncate = require('../utils/truncate')
const factory = require('../factories')

describe('Authentication', () => {
    beforeEach(async () => {
        await truncate();
    })

    it("should authenticate with valid credentials", async () => {
        const user = await factory.create('User', {
            password: '123123'
        })

        const response = await request(app)
            .post('/sessions') 
            .send({
                email: user.email,
                password: '123123'
            })
        
        expect(response.status).toBe(200);
    })

    it('should not authenticate with invalid email', async () => {
        const user = await factory.create('User', {
            email: 'herick.victor.rodrigues@gmail.com'
        })

        const response = await request(app)
            .post('/sessions')
            .send({
                email: 'herick.victor.rodrigues@hotmail.com',
                password: '123456'
            })

        expect(response.status).toBe(401);
    })

    it('should not authenticate with invalid password', async () => {
        const user = await factory.create('User')

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123123'
            })

        expect(response.status).toBe(401);
    })

    it('should return JWT token when authenticated', async () => {
        const user = await factory.create('User')

        const response = await request(app)
        .post('/sessions')
        .send({
            email: user.email,
            password: user.password
        })

        expect(response.body).toHaveProperty('token')
    })

    it('should be able to access private routes when authenticated', async () => {
        const user = await factory.create('User')

        const response = await request(app)
        .get('/dashboard')
        .set('Authorization', `Bearer ${user.generateToken()}`)

        expect(response.status).toBe(200)
    })

    it('should not be able to access private routes without jwt token', async () => {
        const response = await request(app)
            .get('/dashboard')
        
        expect(response.status).toBe(401)
    })

    it('should not be able to access private routes with invalid jwt token', async () => {

        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer zsxdfhyzsd8fuhsd9f83y209`)
        
        expect(response.status).toBe(401)
    })
})
