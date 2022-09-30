const { Router } = require('express')
const cardController = require('../controllers/cardController')
const { requireAuth } = require('../middleware/authMiddleware')

const router = Router()

router.get('/', cardController.home_get)
router.get('/home', requireAuth, cardController.user_home_get)
router.get('/:subcategory/:title', cardController.set_get)
router.delete('/:subcategory/:title', cardController.set_delete)
router.get('/create', requireAuth, cardController.create_get)
router.post('/create', cardController.create_post)
router.get('/edit-set', requireAuth, cardController.edit_set_get)
router.post('/edit-set', cardController.edit_set_post)
router.get('/edit-card', requireAuth, cardController.edit_card_get)
router.post('/edit-card', cardController.edit_card_post)

module.exports = router