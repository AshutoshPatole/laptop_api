import { Router } from 'express'
import cache from '../../helper/express_cache'
import analytics from './analytics'
import bulkInsert from './bulk-upload'
import rankingSystem from './rankingSystem'
import update from './dynamicUpdate'
import updatePricing from './updatePricing'

const adminRouter = Router()

adminRouter.get('/ranking', rankingSystem)
adminRouter.get('/analytics', cache.route(), analytics)
adminRouter.get('/update-pricing', updatePricing)
adminRouter.get('/bulk-insert', bulkInsert)
adminRouter.get('/update', update)

export default adminRouter
