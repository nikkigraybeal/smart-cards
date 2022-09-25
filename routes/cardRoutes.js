const { Router } = require('express')
const cardController = require('../controllers/cardController')
const { requireAuth } = require('../middleware/authMiddleware')

const router = Router()

router.get('/', cardController.home_get)
router.get('/home', requireAuth, cardController.user_home_get)
router.get('/:subcategory/:title', cardController.set_get)
router.delete('/:subcategory/:title', cardController.set_delete)
router.get('/create', cardController.create_get)
router.post('/create', cardController.create_post)

module.exports = router