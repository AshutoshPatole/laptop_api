import { Router } from 'express'
import cache from '../../helper/express_cache'
import analytics from './analytics'
import bulkInsert from './bulk-upload'
import rankingSystem from './rankingSystem'
import update from './dynamicUpdate'
import updatePricing from './updatePricing'
import verifyToken from '../../middleware/verifyToken'
import createAdminUser from './createAdmin'
import getDuplicates from './fetchDuplicates'
import isAdmin from '../../middleware/isAdmin'

const adminRouter = Router()

adminRouter.get('/ranking', verifyToken, rankingSystem)
adminRouter.get('/analytics', verifyToken, cache.route(), analytics)
adminRouter.get('/update-pricing', verifyToken, updatePricing)
adminRouter.get('/bulk-insert', verifyToken, bulkInsert)
adminRouter.get('/update', verifyToken, update)
adminRouter.get('/duplicate', verifyToken, isAdmin, getDuplicates)
adminRouter.post('/create-user', createAdminUser)

export default adminRouter
