import { Router } from 'express'
import * as cardsCtrl from '../controllers/cards.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)

router.get('/', checkAuth, cardsCtrl.index)
router.get('/:id', checkAuth, cardsCtrl.show)

router.post('/', checkAuth, cardsCtrl.create)
router.post('/:id/tips', checkAuth, cardsCtrl.createTip)

router.put('/:id', checkAuth, cardsCtrl.update)

router.delete('/:id', checkAuth, cardsCtrl.delete)

export { router }