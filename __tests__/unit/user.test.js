const { User } = require('../../src/app/models');
const argon2 = require('argon2');
const truncate = require('../utils/truncate');

describe('User', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('should encrypt user password', async () => {
        const user = await User.create({
            name: 'Herick',
            email: 'herick.victor.rodrigues@hotmail.com',
            password: '123456'
        })

        const compareHash = await argon2.verify(user.password_hash, user.password)


        expect(compareHash).toBe(true)
    })
})