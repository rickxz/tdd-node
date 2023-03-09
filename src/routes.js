const routes = require('express').Router();

const authMiddleware = require('./app/middleware/auth')

const SessionController = require('./app/controllers/SessionController');


// Routes Definition 
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.get('/dashboard', async (req, res) => {
    res.sendStatus(200)
})

module.exports = routes